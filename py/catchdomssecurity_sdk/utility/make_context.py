# CatchdomsSecurity SDK utility: make_context

from catchdomssecurity_sdk.core.context import CatchdomsSecurityContext


def make_context_util(ctxmap, basectx):
    return CatchdomsSecurityContext(ctxmap, basectx)
