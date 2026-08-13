# CatchdomsSecurity SDK feature factory

from catchdomssecurity_sdk.feature.base_feature import CatchdomsSecurityBaseFeature
from catchdomssecurity_sdk.feature.test_feature import CatchdomsSecurityTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CatchdomsSecurityBaseFeature(),
        "test": lambda: CatchdomsSecurityTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
