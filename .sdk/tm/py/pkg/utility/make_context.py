# CatchdomsSecurity SDK utility: make_context

from projectname_sdk.core.context import CatchdomsSecurityContext


def make_context_util(ctxmap, basectx):
    return CatchdomsSecurityContext(ctxmap, basectx)
