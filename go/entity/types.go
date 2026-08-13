// Typed models for the CatchdomsSecurity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/catchdoms-security-sdk/go/core"
)

// Domain is the typed data model for the domain entity.
type Domain struct {
	Age *int `json:"age,omitempty"`
	AuctionEndDate *string `json:"auction_end_date,omitempty"`
	BacklinksCount *int `json:"backlinks_count,omitempty"`
	BidsCount *int `json:"bids_count,omitempty"`
	CitationFlow *int `json:"citation_flow,omitempty"`
	DomainAuthority *int `json:"domain_authority,omitempty"`
	EduGovBacklinks *int `json:"edu_gov_backlinks,omitempty"`
	EffectivePrice *float64 `json:"effective_price,omitempty"`
	HasGmb *bool `json:"has_gmb,omitempty"`
	Id int `json:"id"`
	Language *string `json:"language,omitempty"`
	MaxBid *float64 `json:"max_bid,omitempty"`
	Name string `json:"name"`
	Pagerank *int `json:"pagerank,omitempty"`
	Price *float64 `json:"price,omitempty"`
	PurchaseUrl *string `json:"purchase_url,omitempty"`
	ReferringDomains *int `json:"referring_domains,omitempty"`
	Score int `json:"score"`
	Source string `json:"source"`
	Tld string `json:"tld"`
	TopicalTrustFlow *string `json:"topical_trust_flow,omitempty"`
	TrustFlow *int `json:"trust_flow,omitempty"`
	Type *string `json:"type,omitempty"`
	WaybackFirstDate *string `json:"wayback_first_date,omitempty"`
	WaybackSnapshots *int `json:"wayback_snapshots,omitempty"`
}

// DomainListMatch is the typed request payload for Domain.ListTyped.
type DomainListMatch struct {
	Age *int `json:"age,omitempty"`
	AuctionEndDate *string `json:"auction_end_date,omitempty"`
	BacklinksCount *int `json:"backlinks_count,omitempty"`
	BidsCount *int `json:"bids_count,omitempty"`
	CitationFlow *int `json:"citation_flow,omitempty"`
	DomainAuthority *int `json:"domain_authority,omitempty"`
	EduGovBacklinks *int `json:"edu_gov_backlinks,omitempty"`
	EffectivePrice *float64 `json:"effective_price,omitempty"`
	HasGmb *bool `json:"has_gmb,omitempty"`
	Id *int `json:"id,omitempty"`
	Language *string `json:"language,omitempty"`
	MaxBid *float64 `json:"max_bid,omitempty"`
	Name *string `json:"name,omitempty"`
	Pagerank *int `json:"pagerank,omitempty"`
	Price *float64 `json:"price,omitempty"`
	PurchaseUrl *string `json:"purchase_url,omitempty"`
	ReferringDomains *int `json:"referring_domains,omitempty"`
	Score *int `json:"score,omitempty"`
	Source *string `json:"source,omitempty"`
	Tld *string `json:"tld,omitempty"`
	TopicalTrustFlow *string `json:"topical_trust_flow,omitempty"`
	TrustFlow *int `json:"trust_flow,omitempty"`
	Type *string `json:"type,omitempty"`
	WaybackFirstDate *string `json:"wayback_first_date,omitempty"`
	WaybackSnapshots *int `json:"wayback_snapshots,omitempty"`
}

// Mcp is the typed data model for the mcp entity.
type Mcp struct {
	Capabilities *[]any `json:"capabilities,omitempty"`
	Server *string `json:"server,omitempty"`
	Version *string `json:"version,omitempty"`
}

// McpListMatch is the typed request payload for Mcp.ListTyped.
type McpListMatch struct {
	Capabilities *[]any `json:"capabilities,omitempty"`
	Server *string `json:"server,omitempty"`
	Version *string `json:"version,omitempty"`
}

// PendingDelete is the typed data model for the pending_delete entity.
type PendingDelete struct {
	Age *int `json:"age,omitempty"`
	BacklinksCount *int `json:"backlinks_count,omitempty"`
	DaysUntilDrop *int `json:"days_until_drop,omitempty"`
	Id int `json:"id"`
	Name string `json:"name"`
	PredictedDropDate string `json:"predicted_drop_date"`
	ReferringDomains *int `json:"referring_domains,omitempty"`
	Score *int `json:"score,omitempty"`
	Status string `json:"status"`
	Tld string `json:"tld"`
}

// PendingDeleteListMatch is the typed request payload for PendingDelete.ListTyped.
type PendingDeleteListMatch struct {
	Age *int `json:"age,omitempty"`
	BacklinksCount *int `json:"backlinks_count,omitempty"`
	DaysUntilDrop *int `json:"days_until_drop,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PredictedDropDate *string `json:"predicted_drop_date,omitempty"`
	ReferringDomains *int `json:"referring_domains,omitempty"`
	Score *int `json:"score,omitempty"`
	Status *string `json:"status,omitempty"`
	Tld *string `json:"tld,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
