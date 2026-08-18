package voxgigcatchdomssecuritysdk

import (
	"github.com/voxgig-sdk/catchdoms-security-sdk/go/core"
	"github.com/voxgig-sdk/catchdoms-security-sdk/go/entity"
	"github.com/voxgig-sdk/catchdoms-security-sdk/go/feature"
	_ "github.com/voxgig-sdk/catchdoms-security-sdk/go/utility"
)

// Type aliases preserve external API.
type CatchdomsSecuritySDK = core.CatchdomsSecuritySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CatchdomsSecurityEntity = core.CatchdomsSecurityEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CatchdomsSecurityError = core.CatchdomsSecurityError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDomainEntityFunc = func(client *core.CatchdomsSecuritySDK, entopts map[string]any) core.CatchdomsSecurityEntity {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewMcpEntityFunc = func(client *core.CatchdomsSecuritySDK, entopts map[string]any) core.CatchdomsSecurityEntity {
		return entity.NewMcpEntity(client, entopts)
	}
	core.NewPendingDeleteEntityFunc = func(client *core.CatchdomsSecuritySDK, entopts map[string]any) core.CatchdomsSecurityEntity {
		return entity.NewPendingDeleteEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCatchdomsSecuritySDK = core.NewCatchdomsSecuritySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCatchdomsSecuritySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CatchdomsSecuritySDK  { return NewCatchdomsSecuritySDK(nil) }
func Test() *CatchdomsSecuritySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
