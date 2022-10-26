import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector"
import useDidMountEffect from "../hooks/useDidMountEffect";
import DeleteModal from "../components/modal/DeleteModal";
import Table from "../components/table/Table";
import { getUsers, getUserObject, deleteUserById } from "../store/user.slice";
import { User } from "../types/global";
// import { deleteChats } from "../store/actions/chats";
// import { deleteUserAllSharedTo } from "../store/actions/share";
// import { deleteUploads } from "../store/actions/uploads";
// import { getMyUploads } from "../store/actions/uploads";
// import { getSharedUploads } from "../store/actions/share";
// import { getChats } from "../store/actions/chats";

export default function Users() {
  //#region - HOOKS
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const store = useAppSelector((state) => state.user);
  const [usersCount, setUsersCount] = useState(0);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState({});
  const [lastDeletedAccount, setLastDeletedAccount] = useState({});
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  useDidMountEffect(() => {
    refetchAllAfterDelete();
  }, [lastDeletedAccount]); //eslint-disable-line

  const fetchData = async () => {
    const fetchUsers = await dispatch(getUsers());
    // await dispatch(getUserObject());

    setUsersCount(fetchUsers.payload.length);
  };

  const refetchAllAfterDelete = async () => {
    const fetchUsers = await dispatch(getUsers());
    // await dispatch(getUserObject());
    // await dispatch(getMyUploads());
    // await dispatch(getSharedUploads());
    // await dispatch(getChats());

    setUsersCount(fetchUsers.payload.length);
  };
  //#endregion

  //#region - EDIT
  const redirectEdit = (account: User) => {
    navigate(`/edit-user?id=${account.id}`);
  };
  //#endregion

  //#region - DELETE
  const showDelete = async (account: User) => {
    if (store.current?.id === account.id) return;
    setDeleteModalState(true);
    setDeleteAccount(account);
  };

  const confirmDelete = async () => {
    // dispatch(deleteUserById(deleteAccount.id)); //TODO
    // dispatch(deleteChats(deleteAccount.id));
    // dispatch(deleteUserAllSharedTo(deleteAccount.id));
    // dispatch(deleteUploads(deleteAccount.id));
    setDeleteModalState(false);
    setLastDeletedAccount(deleteAccount);
  };
  //#endregion

  //#region - RENDER
  const renderEmptyRow = (count: number) => {
    const emptyRows = 12;
    if (emptyRows - count > 0) {
      return [...Array(emptyRows - count)].map((rows, i) => (
        <tr key={i}>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      ));
    }
  };
  //#endregion

  return (
    <div className="users-page">
      <div className="users-header-div">
        <h2>
          <b>Users</b>
        </h2>
      </div>
      <div id="users-table-div">
        <Table
          header={["Name", "User Email ID"]}
          keys={["fullName", "email"]}
          data={store.accounts}
          onEdit={redirectEdit}
          onDelete={showDelete}
          custom={{ disableDelete: store.current}}
          customRender={renderEmptyRow(usersCount)}
        />
      </div>
      <DeleteModal
        onHide={() => setDeleteModalState(false)}
        handleDelete={confirmDelete}
        show={deleteModalState}
        account={deleteAccount}
      />
    </div>
  );
}
