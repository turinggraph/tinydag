import queue
from typing import List
from collections import namedtuple, defaultdict
from concurrent.futures import ThreadPoolExecutor
import time
from itertools import chain
from graphviz import Digraph
import json
import logging

# logging.basicConfig(
#     level=logging.DEBUG,  # 控制台打印的日志级别
#     filename="src/log/dag_test.log",
#     filemode="w",  ##模式，有w和a，w就是写模式，每次都会重新写日志，覆盖之前的日志
#     # a是追加模式，默认如果不写的话，就是追加模式
#     format="%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s"
#     # 日志格式
# )


class Logger:
    def __init__(self, *args, **kwargs):
        logger = logging.getLogger(__name__)
        logger.setLevel(level=logging.INFO)
        handler = logging.FileHandler("src/log/dag_test.log", mode="w")
        handler.setLevel(logging.INFO)
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        self.logger = logger

    def log(self, _type, message):
        assert type(message) == dict
        assert len(_type) > 0
        message.update({"type": _type})

        self.logger.info(json.dumps(message))


logger = Logger()


class Message(object):
    def __init__(self, name, q=None, callback=lambda n: None):
        self.q = queue.Queue(1) if q is None else q
        self.name = name
        self.callback = callback

    def put(self, var):
        self.callback(
            {
                "name": self.name,
                "stage": "put",
                "state": "wait",
                "value": str(var),
            }
        )
        self.q.put(var)
        self.callback(
            {
                "name": self.name,
                "stage": "put",
                "state": "finish",
                "value": str(var),
            }
        )

    def get(self):
        self.callback(
            {
                "name": self.name,
                "stage": "get",
                "state": "wait",
                "value": "unknown",
            }
        )
        r = self.q.get()
        self.callback(
            {
                "name": self.name,
                "stage": "get",
                "state": "finish",
                "value": str(r),
            }
        )
        return r

    def rename(self, name):
        return Message(name, self.q)


class MessageGateway(object):
    def __init__(self, threadpool: ThreadPoolExecutor):
        self.router = defaultdict(
            self.RouteRecord
        )  # same name message transformer
        self.nat = {}  # outter -> inner message transformer
        self.threadpool = threadpool

    class RouteRecord(object):
        def __init__(self, product=None, consumes=[]):
            self.product = product
            self.consumes = []

    def register(
        self, products: List[Message] = [], consumes: List[Message] = []
    ):
        for pm in products:
            record = self.router[pm.name]
            record.product = pm  # old message product ignore

        for cm in consumes:
            record = self.router[cm.name]
            record.consumes.append(cm)

    @staticmethod
    def broadcast(message, record):  # in thread async
        result = record.product.get()
        #         print("Message <-:", record.product.name, result)
        for consume in record.consumes:
            #             print("Message ->:", consume.name, result)
            consume.put(result)
        # return status
        return {"message": message, "status": "success"}

    @staticmethod
    def broadcast_callback(status):
        pass

    #         print("CALLBACK")
    #         print(status.result())

    def listen(self):
        for message, record in self.router.items():
            self.threadpool.submit(
                MessageGateway.broadcast, message, record
            ).add_done_callback(MessageGateway.broadcast_callback)


class Variable(object):
    def __init__(self, fmt):
        self.fmt = fmt
        pass

    def consume(self):
        return self.fmt.split("$")[1].split("[")[0]

    def assign(self, var):
        self.var = var

    def value(self):
        if isinstance(self.var, (Message, queue.Queue)):
            return self.var.get()
        else:
            return self.var


import pdb


class TDigraph(Digraph):
    def __init__(self, *args, **kwargs):
        super(TDigraph, self).__init__(*args, **kwargs)
        self.name = kwargs["name"]
        self._nodes = {}
        self._edges = []
        self._subgraphs = []

    def node(self, name, label=None, _attributes=None, **attrs):
        self._nodes[name] = {
            "label": name if label is None else label,
            "name": name,
        }
        if _attributes is not None:
            self._nodes[name].update(_attributes)
        super(TDigraph, self).node(
            name, label=label, _attributes=_attributes, **attrs
        )

    def edge(self, tail_name, head_name, label=None, _attributes=None, **attrs):
        _edge = {"label": label, "tail_name": tail_name, "head_name": head_name}
        if _attributes is not None:
            _edge.update(_attributes)
        self._edges.append(_edge)
        super(TDigraph, self).edge(
            tail_name, head_name, label=label, _attributes=_attributes, **attrs
        )

    def subgraph(
        self,
        graph=None,
        name=None,
        comment=None,
        graph_attr=None,
        node_attr=None,
        edge_attr=None,
        body=None,
    ):
        self._subgraphs.append(graph)
        # pdb.set_trace()
        super(TDigraph, self).subgraph(
            graph=graph,
            name=name,
            comment=comment,
            graph_attr=graph_attr,
            node_attr=node_attr,
            edge_attr=edge_attr,
            body=body,
        )

    def json(self):
        return {
            "name": self.name,
            "nodes": self._nodes,
            "edges": self._edges,
            "subgraph": [g.json() for g in self._subgraphs],
        }
        pass


class GraphVizMixin(object):
    def visualize(self, graph=None):

        return graph
        pass

    pass


class Task(GraphVizMixin):
    def __init__(self, func, *args, **kwargs):

        self.func = func
        self.args = list(args)
        self.kwargs = kwargs
        self.variable_check()
        pass

    def variable_check(self):
        for i, arg in enumerate(self.args):
            if type(arg) is str and "$" in arg:
                self.args[i] = Variable(arg)

        for k, arg in self.kwargs.items():
            if type(arg) is str and "$" in arg:
                self.kwargs[k] = Variable(arg)

    @property
    def name(self):
        return self.func.__name__

    @property
    def id(self):
        return str(self) + self.name

    def visualize(self, graph=None):
        graph.node(self.name)
        return graph

    def variables(self):
        vars = list(
            chain(
                filter(lambda a: isinstance(a, Variable), self.args),
                map(
                    lambda r: r[1],
                    filter(
                        lambda r: isinstance(r[1], Variable),
                        self.kwargs.items(),
                    ),
                ),
            )
        )
        return vars

    def variables_placeholder(self):
        placeholders = []
        for i, arg in enumerate(self.args):
            if isinstance(arg, Variable):
                placeholders.append((i, arg))

        for k, arg in self.kwargs.items():
            if isinstance(arg, Variable):
                placeholders.append((k, arg))
        return placeholders

    def __call__(self, *args, **kwargs):
        self.args.extend(list(args))
        self.kwargs.update(kwargs)
        self.variable_check()
        return self

    @staticmethod
    def args_values(*args):
        return [
            arg.value() if isinstance(arg, Variable) else arg for arg in args
        ]

    @staticmethod
    def kwargs_values(**kwargs):
        return {
            k: (arg.value() if isinstance(arg, Variable) else arg)
            for k, arg in kwargs.items()
        }

    @staticmethod
    def execute_daemon(func, message, _id, *args, **kwargs):
        #         print("Execute Daemon")
        #         print(args, kwargs)
        # STATE: Running
        logger.log("UpdateTaskState", {"id": _id, "state": "wait"})
        _args, _kwargs = Task.args_values(*args), Task.kwargs_values(**kwargs)
        logger.log("UpdateTaskState", {"id": _id, "state": "Running"})
        stime = time.time()
        result = func(*_args, **_kwargs)
        logger.log(
            "UpdateTaskState",
            {
                "result": result,
                "id": _id,
                "state": "Success",
                "delta": "%.3f" % (time.time() - stime),
            },
        )
        message.put(result)

        # STATE: Return result
        return result

    @staticmethod
    def execute_callback(future):
        # logger.log("", {"STATE": "Finish"})

        # STATE: Finish Success or Failure

        #         print("execute_callback", fu.result())
        pass

    def execute(self, pool, message=None, future=True):
        #         print("Execute")
        if message is None:
            message = Message("task_{}".format(time.time()))
        # STATE: Submitted, waiting for running
        logger.log("UpdateTaskState", {"id": self.id, "state": "Submit"})
        pool.submit(
            Task.execute_daemon,
            self.func,
            message,
            self.id,
            *self.args,
            **self.kwargs
        ).add_done_callback(Task.execute_callback)
        return message if future else message.get()
        #         print("MM:", msg.get())

        pass

    pass


import inspect


class EndTask(Task):
    def __init__(self, *args, **kwargs):
        super(EndTask, self).__init__(*args, **kwargs)


def aaa(*args, **kwargs):
    pass


class DAG(Task):
    def __init__(self, config, *args, **kwargs):  # init config
        super(DAG, self).__init__(self.func, *args, **kwargs)
        self.config = {
            k: Task(*v) if isinstance(v, tuple) else v
            for k, v in config.items()
        }
        #         self.gateway = MessageGateway()
        self.tasks = []

    def message(self, name):
        def _c(r):
            res = {"context": str(self)}
            res.update(r)
            logger.log("VariableStateUpdate", res)

        return Message(name, callback=_c)

    # func proxy run in thread
    def func(self, *args, **kwargs):
        """
        func wrapper in DAG
        """
        #         print("DAG fun")
        end_task_product_message = None
        for product_message_name, product_task in self.config.items():
            product_message = self.message(product_message_name)
            if isinstance(product_task, EndTask):
                end_task_product_message = product_message
            self.gateway.register(products=[product_message])
            for var in product_task.variables():
                consume_message = self.message(var.consume())
                var.assign(consume_message)  # key action
                self.gateway.register(consumes=[consume_message])
            product_task.execute(self.pool, product_message)
        # Fake message for args, kwargs
        for i, arg in enumerate(args):
            msg = self.message(str(i))
            msg.put(arg)
            self.gateway.register(products=[msg])

        for k, arg in kwargs.items():
            msg = self.message(k)
            msg.put(arg)
            self.gateway.register(products=[msg])
        result_message = self.message(end_task_product_message.name)
        self.gateway.register(consumes=[result_message])
        self.gateway.listen()
        return result_message.get()

    # @property
    # def endname(self):
    #     for k, task in self.config.items():
    #         if isinstance(task, EndTask):
    #             return k

    @property
    def endtask(self):
        for k, task in self.config.items():
            if isinstance(task, EndTask):
                return task

    def visualize(self, graph=None):
        if graph is None:
            graph = TDigraph(format="dot", name="cluster" + str(self))
        # NODE[Task]
        for message, task in self.config.items():
            if isinstance(task, DAG):
                sg = TDigraph(name="cluster" + str(task))
                task.visualize(sg)
                graph.subgraph(sg)
            else:
                # task.visualize(graph)

                try:
                    sources = str(inspect.getsource(task.func))
                except TypeError:
                    sources = ""
                    pass
                try:
                    module = str(inspect.getmodule(task.func))
                except TypeError:
                    module = ""
                    pass
                try:
                    sourcefile = str(inspect.getsourcefile(task.func))
                except TypeError:
                    sourcefile = ""
                    pass
                graph.node(
                    str(task) + task.name,
                    shape="rect",
                    _attributes={
                        "_type": "function",
                        "_id": str(task) + task.name,
                        "_name": task.name,
                        "func": inspect.getdoc(task.func),
                        "args": str(inspect.signature(task.func)),
                        "sources": sources,
                        "module": module,
                        "sourcefile": sourcefile,
                    },
                )
        # print("CONFIG", self.config)
        # edge between variable
        for product_message_name, product_task in self.config.items():
            graph.node(
                str(self) + product_message_name,
                _attributes={
                    "_type": "variable",
                    "_id": str(self) + product_message_name,
                    "_name": product_message_name,
                },
            )
            if isinstance(product_task, DAG):

                graph.edge(
                    str(product_task)
                    + product_task.endtask.name,  # message name
                    # product_task.endtask.id,
                    str(self) + product_message_name,
                )
                for (
                    name,
                    var,
                ) in product_task.variables_placeholder():  # TODO(ugly)
                    # print((
                    #     str(var) + var.consume(), str(product_task) + product_task.name, type(product_task), product_task.name, name
                    # ))
                    graph.edge(
                        str(self) + var.consume(), str(product_task) + name
                    )
            else:
                graph.edge(
                    product_task.id,
                    str(self) + product_message_name,
                )
            # NODE[variable]
            for var in product_task.variables():
                graph.node(
                    str(self) + var.consume(),
                    # shape="rect",
                    _attributes={
                        "_type": "variable",
                        "_id": str(self) + var.consume(),
                        "_name": var.consume(),
                    },
                )

                if not isinstance(product_task, DAG):
                    graph.edge(
                        str(self) + var.consume(),
                        product_task.id,
                    )

        return graph

    def execute(self, pool, message=None, future=True):
        self.pool = pool
        self.gateway = MessageGateway(pool)
        return super(DAG, self).execute(pool, message, future)

    def all_tasks_listen(self):
        pass


import http.server
import socketserver

# import socketserver


class ServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.protocol_version = "HTTP/1.1"
        self._headers = self.headers
        self._url = self.path
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(b"{'a':3}")


import threading
import time
import random


def wait(fun, duration=None):
    if duration is None:
        duration = random.randint(5, 15)

    def wrapper(*args, **kwargs):
        time.sleep(duration)
        return fun(*args, **kwargs)

    wrapper.__name__ = fun.__name__
    return wrapper


if __name__ == "__main__":
    httpd = socketserver.TCPServer(("", 8900), ServerHandler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()

    from operator import add, sub, mul, truediv

    # (1 + 20) * (12 + (1+20) )
    subdag = DAG(
        {
            "sub": (wait(sub), 12, "$a"),
            "div": (wait(truediv), 2, "$b"),
            "mul": EndTask(wait(mul), "$div", "$sub"),
        }
    )(a="$add", b="$add")
    # subdag2 = DAG(
    #             {
    #                 "sub": (sub, 12, "$a"),
    #                 "div": (truediv, 2, "$b"),
    #                 "mul": EndTask(mul, "$div", "$sub"),
    #             }
    #         )(a="$add", b="$add")
    dag = DAG(
        {
            "add": (wait(add), 1, "$a"),
            "sub": subdag,
            "mul": EndTask(wait(mul), "$add", "$sub"),
        }
    )(
        a=20, b=3, c=10
    )  # .execute(pool).get()

    # dag.visualize().render("test.json", view=False, format="json0")
    dag.visualize().render("aa.dot", view=False, format="dot")
    open("tinyweb/public/t3.json", "w").write(
        json.dumps(dag.visualize().json())
    )
    logger.log("InitSchema", dag.visualize().json())
    with ThreadPoolExecutor(20) as pool:
        print(dag.execute(pool).get())

    # time.sleep(100)

    # Handler = http.server.SimpleHTTPRequestHandler


# PRODUCT {'_type': 'variableProduct', '_id': '<__main__.DAG object at 0x7f6e2ed19210>sub', '_name': 'sub'}
# PRODUCT {'_type': 'variableProduct', '_id': '<__main__.DAG object at 0x7f6e2ed19210>div', '_name': 'div'}
# PRODUCT {'_type': 'variableProduct', '_id': '<__main__.DAG object at 0x7f6e2ed19210>mul', '_name': 'mul'}
# PRODUCT {'_type': 'variableProduct', '_id': '<__main__.DAG object at 0x7f6e2ed19510>add', '_name': 'add'}
# PRODUCT {'_type': 'variableProduct', '_id': '<__main__.DAG object at 0x7f6e2ed19510>sub', '_name': 'sub'}
# PRODUCT {'_type': 'variableProduct', '_id': '<__main__.DAG object at 0x7f6e2ed19510>mul', '_name': 'mul'}


# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19210>a', '_name': 'a'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19210>b', '_name': 'b'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19210>div', '_name': 'div'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19210>sub', '_name': 'sub'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19510>a', '_name': 'a'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19510>add', '_name': 'add'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19510>add', '_name': 'add'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19510>add', '_name': 'add'}
# VARIABLE {'_type': 'variable', '_id': '<__main__.DAG object at 0x7f6e2ed19510>sub', '_name': 'sub'}
# print(inspect.getdoc(mul))
