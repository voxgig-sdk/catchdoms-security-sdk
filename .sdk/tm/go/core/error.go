package core

type CatchdomsSecurityError struct {
	IsCatchdomsSecurityError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCatchdomsSecurityError(code string, msg string, ctx *Context) *CatchdomsSecurityError {
	return &CatchdomsSecurityError{
		IsCatchdomsSecurityError: true,
		Sdk:              "CatchdomsSecurity",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CatchdomsSecurityError) Error() string {
	return e.Msg
}
