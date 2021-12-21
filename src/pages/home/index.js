import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "../../utils/axios";
import { ToastShow, ContainerToast } from "../../utils/toast";

export default function Index(props) {
  const isAuthentication = localStorage.getItem("login");
  const [counter, setCounter] = useState(1);
  const [counterArrayy, setCounterArrayy] = useState([]);
  const [allBonus, setAllBonus] = useState([]);
  const [nominal, setNominal] = useState(0);
  const [inputArray, setInputArray] = useState({});
  const [jumlahPersen, setJumlahPersen] = useState(0);
  const [isNull, setisNull] = useState(true);
  const [isEdit, setIsEdit] = useState({});
  const [showDetail, setShowDetail] = useState({});
  useEffect(() => {
    console.log(isAuthentication);
    if (!isAuthentication) {
      props.history.push("/auth/login");
    }
    getAllBonus();
  }, []);

  useEffect(() => {
    getArray();
    getPersen();
  }, [counter, inputArray]);

  const getArray = () => {
    let value = [];
    for (let i = 1; i < counter; i++) {
      value.push(i);
      setCounterArrayy(value);
    }
  };
  const getAllBonus = async () => {
    try {
      const result = await axios.get("/api/bonus");
      setAllBonus(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPersen = () => {
    let jumlah = 0;
    for (let i = 0; i < counter; i++) {
      if ((inputArray[i] ? inputArray[i].discount : 0) < 0) {
        setisNull(true);
      } else if (inputArray[i] ? inputArray[i].discount : null) {
        jumlah = jumlah + Number(inputArray[i] ? inputArray[i].discount : null);
        setisNull(false);
      } else {
        setisNull(true);
      }
      setJumlahPersen(jumlah);
    }
  };
  const handleNominal = (e) => {
    setNominal(e);
  };
  const bagiDuit = (e, i) => {
    setInputArray({
      ...inputArray,
      [i]: { discount: e, value: (e / 100) * nominal },
    });
    console.log(inputArray);
  };
  const downCounter = () => {
    setCounter(counter - 1);
    delete inputArray[counter - 1];
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const setData = {
      data: inputArray,
    };
    axios
      .post("/api/bonus-post", setData)
      .then((res) => {
        console.log("iniDIa =>", res);
        ToastShow(200, "Success !");
        getAllBonus();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleEdit = (e) => {
    setIsEdit({
      status: true,
      id: e.id,
      nama: e.nama,
      bonusRp: e.bonusRp,
      bonusPersen: e.bonusPersen,
    });
  };

  const handleInputUpdate = (e) => {
    setIsEdit({ ...isEdit, [e.target.name]: e.target.value });
  };
  const handleSubmitUpdate = async () => {
    try {
      if (isEdit.bonusPersen < 0 || isEdit.bonusPersen > 100) {
        alert("Bonus Persen Masih Salah");
      } else {
        const result = await axios.post("/api/bonus-edit", isEdit);
        ToastShow(200, "Success Update !");
        getAllBonus();
        setIsEdit({});
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("are you sure ?")) {
      const setData = {
        id: id,
      };
      axios
        .post("/api/bonus-delete", setData)
        .then((res) => {
          ToastShow(200, "Success Deleted !");
          getAllBonus();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleLogout = () => {
    console.log("LOGOUT");
    localStorage.clear();
    props.history.push("/auth/login");
  };
  let isRole = localStorage.getItem("persist:root");
  if (isRole) {
    isRole = JSON.parse(isRole);
    isRole = JSON.parse(isRole.auth).userLogin;
  }
  return (
    <div>
      <ContainerToast />
      <div class="d-flex justify-content-center mt-4">
        <div class="w-50">
          <div class="text-center mb-3">
            Selamat Sore {isRole && isRole.name} ! Kamu Login Sebagai Admin,{" "}
            <br />
            <button className="btn" onClick={handleLogout}>
              Klik Disini Untuk Logout
            </button>
          </div>
          <div class="card card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="text-center">Form Bonus</h3>
              <label for="">Pembayaran</label>
              <div class="d-flex justify-content-between mb-3">
                <div class="w-100">
                  <input
                    type="number"
                    className="form-control w-100"
                    required
                    onChange={(e) => handleNominal(e.target.value)}
                  />
                </div>
                {nominal ? (
                  <div class="d-flex">
                    <button
                      className="btn btn-outline-success  ml-2"
                      type="button"
                      onClick={() => setCounter(counter + 1)}
                    >
                      +
                    </button>
                    {counter > 2 ? (
                      <button
                        className="btn btn-outline-danger mx-2"
                        type="button"
                        onClick={(e) => downCounter()}
                      >
                        -
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {counterArrayy.map((e) => (
                <div class="form-group">
                  <label for="">Buruh {e}</label>
                  <div class="d-flex ">
                    <input
                      type="number"
                      className="form-control"
                      required
                      maxlength="6"
                      onChange={(element) => bagiDuit(element.target.value, e)}
                    />
                    <h4 className="align-self-center mx-3">%</h4>
                    <input
                      type="number"
                      className="form-control buruh"
                      value={inputArray[e] ? inputArray[e].value : 0}
                      readOnly
                    />
                  </div>
                </div>
              ))}
              {isNull ? (
                <button className="btn btn-success p-2 w-100" disabled>
                  Value Gaji Salah
                </button>
              ) : jumlahPersen === 100 ? (
                <button className="btn btn-success p-2 w-100" type="submit">
                  Simpan
                </button>
              ) : (
                <button className="btn btn-success p-2 w-100" disabled>
                  Error, Jumlah Persen Masih Salah {jumlahPersen}%
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        {isEdit.status ? (
          <div class="form-group">
            <label for="">Edit Buruh - {isEdit.nama} </label>
            <div class="d-flex ">
              <input
                type="number"
                className="form-control"
                required
                maxlength="6"
                name="bonusPersen"
                placeholder="Berapa Persen?"
                value={isEdit.bonusPersen}
                onChange={(e) => handleInputUpdate(e)}
              />
              <h4 className="align-self-center mr-3 ml-2">%</h4>
              <input
                type="number"
                className="form-control buruh"
                name="bonusRp"
                value={isEdit.bonusRp}
                placeholder="Berapa Rp ?"
                onChange={(e) => handleInputUpdate(e)}
                // value={inputArray[e] ? inputArray[e].value : 0}
              />
              <button
                className="btn btn-outline-success ml-4"
                onClick={handleSubmitUpdate}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <table class="table table-bordered text-center">
          <tbody>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Bonus RP</th>
              <th>Bonus %</th>
              <th>Detail</th>
              {isRole && isRole.role === "admin" ? (
                <>
                  <th>Edit</th>
                  <th>Delete</th>
                </>
              ) : (
                ""
              )}
            </tr>
            {allBonus.map((e) => (
              <tr>
                <td>{e.id}</td>
                <td>Pekerja - {e.nama}</td>
                <td>Rp. {e.bonusRp}</td>
                <td>{e.bonusPersen}%</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => setShowDetail(e)}
                  >
                    Detail
                  </button>
                </td>
                {isRole.role === "admin" ? (
                  <>
                    <td>
                      <button
                        class="btn btn-warning"
                        onClick={() => handleEdit(e)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-danger"
                        onClick={() => handleDelete(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Detail Bonus Pekerja - {showDetail.nama}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="">Id</label>
                <input
                  type="text"
                  readOnly
                  value={showDetail.id}
                  className="form-control"
                />
              </div>
              <div class="form-group">
                <label for=""> Bonus Persen</label>
                <input
                  type="text"
                  readOnly
                  value={showDetail.bonusPersen}
                  className="form-control"
                />
              </div>
              <div class="form-group">
                <label for=""> Bonus IDR</label>
                <input
                  type="text"
                  readOnly
                  value={showDetail.bonusRp}
                  className="form-control"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
