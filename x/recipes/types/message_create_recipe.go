package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateRecipe = "create_recipe"

var _ sdk.Msg = &MsgCreateRecipe{}

func NewMsgCreateRecipe(creator string, dish string, ingredients string) *MsgCreateRecipe {
	return &MsgCreateRecipe{
		Creator:     creator,
		Dish:        dish,
		Ingredients: ingredients,
	}
}

func (msg *MsgCreateRecipe) Route() string {
	return RouterKey
}

func (msg *MsgCreateRecipe) Type() string {
	return TypeMsgCreateRecipe
}

func (msg *MsgCreateRecipe) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateRecipe) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateRecipe) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
