# CatchdomsSecurity SDK feature factory

from catchdomssecurity_sdk.feature.base_feature import CatchdomsSecurityBaseFeature
from catchdomssecurity_sdk.feature.ratelimit_feature import CatchdomsSecurityRatelimitFeature
from catchdomssecurity_sdk.feature.retry_feature import CatchdomsSecurityRetryFeature
from catchdomssecurity_sdk.feature.test_feature import CatchdomsSecurityTestFeature
from catchdomssecurity_sdk.feature.timeout_feature import CatchdomsSecurityTimeoutFeature


_FEATURES = {
    "base": lambda: CatchdomsSecurityBaseFeature(),
    "ratelimit": lambda: CatchdomsSecurityRatelimitFeature(),
    "retry": lambda: CatchdomsSecurityRetryFeature(),
    "test": lambda: CatchdomsSecurityTestFeature(),
    "timeout": lambda: CatchdomsSecurityTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
