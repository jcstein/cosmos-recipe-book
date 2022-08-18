package keeper

import (
	"recipes/x/recipes/types"
)

var _ types.QueryServer = Keeper{}
