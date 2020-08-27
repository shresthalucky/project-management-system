export const SET_MEMBERS = 'SET_MEMBERS';
export const UNSET_MEMBERS = 'UNSET_MEMBERS';
export const ADD_MEMBER = 'ADD_MEMBER';

export const setMembers = (members) => ({
  type: SET_MEMBERS,
  payload: members
});

export const unsetMembers = () => ({
  type: UNSET_MEMBERS
});

export const addMember = (member) => ({
  type: ADD_MEMBER,
  payload: member
});