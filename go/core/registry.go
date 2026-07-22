package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDomainEntityFunc func(client *CatchdomsSecuritySDK, entopts map[string]any) CatchdomsSecurityEntity

var NewMcpEntityFunc func(client *CatchdomsSecuritySDK, entopts map[string]any) CatchdomsSecurityEntity

var NewPendingDeleteEntityFunc func(client *CatchdomsSecuritySDK, entopts map[string]any) CatchdomsSecurityEntity

