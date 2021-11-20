import React, { useState, useEffect, Fragment } from "react";
import {
  Layout,
  Menu,
  Input,
  Typography,
  Button,
  Rate,
  Modal,
  Upload,
  Checkbox,
} from "antd";
import { Row, Col, Tabs } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./profile.css";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";

const { TabPane } = Tabs;

const { Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

const Profile = () => {
  const [upload, setUpload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [showCompleteDelete, setShowCompleteDelete] = useState(false);
  const [showCompleteEdit, setShowCompleteEdit] = useState(false);
  const [editName, setEditName] = useState(null);
  const [editDesc, setEditDesc] = useState(null);
  const [editTag, setEditTag] = useState(null);
  const [editUrl, setEditUrl] = useState(null);
  const [uploadName, setUploadName] = useState(null);
  const [tags, setTags] = useState(null);
  const [searchedTags, setSearchedTags] = useState([]);
  const [uploadDesc, setUploadDesc] = useState(null);
  const [uploadTag, setUploadTag] = useState([]);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [artwork, setArtwork] = useState([]);
  const [active, setActive] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const cookies = new Cookies();
    getProfile(cookies.get("currentUser").userID);
    getApiOfTag();
  }, []);

  function removeFromEditTag(text) {
    var newTag = editTag.filter((item) => {
      return item !== text;
    });
    setEditTag(newTag);
  }

  function removeFromUploadTag(text) {
    var newTag = uploadTag.filter((item) => {
      return item !== text;
    });
    setUploadTag(newTag);
  }

  function addTag(x, t) {
    if (x.indexOf(t) === -1) {
      x.push(t);
    }
    setSearchedTags([]);
  }

  function getApiOfTag() {
    //hashIt(password);
    axios({ method: "GET", url: "http://localhost:1323/api/paintplz/v1/tags" })
      .then(function (response) {
        console.log(response);
        setTags(response.data.tags);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    if (value === "") {
      setSearchedTags([]);
    } else {
      let result = [];
      console.log(value);
      result = tags.filter((data) => {
        return data.search(value) != -1;
      });
      setSearchedTags(result);
    }
  };

  const getProfile = async (id) => {
    const endpoint =  "http://localhost:1323/api/paintplz/v1/artist_profile/" + id;
    try {
      const res = await axios(
        endpoint,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUser(res.data);
      setArtwork(res.data.artwork);
    } catch (err) {
      throw err;
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const onClickUpload = () => {
    setUpload(true);
  };

  const onclickPic = (props) => {
    setActive(props);
    setEditTag(props.artTag);
  };

  const confirmUpload = async (name, desc, tag, url) => {
    setUploadDesc(null);
    setUploadName(null);
    setUploadTag([]);
    setUpload(false);

    try {
      const res = await axios(
        "http://localhost:1323/api/paintplz/v1/artist_profile/artwork/upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          data: {
            username: "ym",
            artworkName: name,
            artworkDescription: desc,
            artTag: tag,
            artworkUrl: "Artwork.png",
          },
        }
      );
      setUploadDesc(null);
      setUploadName(null);
      setUploadTag(null);
      setUpload(false);
      getProfile(user.username);
    } catch (err) {
      throw err;
    }
  };

  const confirmEdit = async (id, name, desc, tag, url) => {
    setShowCompleteEdit(true);
    try {
      const res = await axios(
        "http://localhost:1323/api/paintplz/v1/artist_profile/artwork/edit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          data: {
            username: "ym",
            artworkID: id,
            artworkName: name,
            artworkDescription: desc,
            artTag: tag,
            artworkUrl: "image 1.png",
          },
        }
      );

      setShowCompleteEdit(true);
      getProfile();
    } catch (err) {
      throw err;
    }
  };

  const confirmDelete = async (id) => {
    setShowCompleteDelete(true);
    try {
      const res = await axios(
        "http://localhost:1323/api/paintplz/v1/artist_profile/artwork/delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          data: { username: "ym", artworkID: id },
        }
      );
      setShowConfirmDelete(false);
      getProfile();
    } catch (err) {
      throw err;
    }
  };

  const onChangeEditDesc = (e) => {
    setEditDesc(e.target.value);
  };

  const onChangeEditName = (e) => {
    setEditName(e.target.value);
  };

  const onChangeUploadDesc = (e) => {
    setUploadDesc(e.target.value);
  };

  const onChangeUploadName = (e) => {
    setUploadName(e.target.value);
  };

  return (
    <Layout className="bg">
      {user && (
        <Content
          style={{
            margin: "20vw",
            padding: 25,
            backgroundColor: "white",
            fontFamily: "Asap",
          }}
        >
          <Row style={{ justifyContent: "space-between" }}>
            <Col>
              <img src="../profile.png" />
            </Col>
            <Col flex="1" style={{ paddingLeft: 25 }}>
              <Row
                style={{
                  display: "flex",
                  flex: 1,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {user.name} {user.surname}
              </Row>
              <Row style={{ fontSize: 16 }}>@{user.username}</Row>
              <Row
                style={{ display: "flex", alignItems: "center", fontSize: 14 }}
              >
                <Rate count={1} defaultValue={1} style={{ marginRight: 5 }} />{" "}
                {user.rating}
              </Row>
            </Col>
            <Col>
              <Row>
                <Button
                  shape="round"
                  style={{
                    color: "white",
                    background: "#A44CD7",
                    minWidth: 120,
                    border: "none",
                  }}
                  onClick={onClickUpload}
                >
                  Upload new artwork <UploadOutlined />
                </Button>
              </Row>
            </Col>
          </Row>

          <Row style={{ paddingTop: 30 }}>
            <Col>
              <Row style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
                Biography
              </Row>
              <Row style={{ fontSize: 16, color: "gray" }}>
                {user.Biography}
              </Row>
            </Col>
          </Row>

          <Row>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab="Home"
                key="1"
                style={{ padding: 20, paddingTop: 0 }}
              >
                <Row style={{ marginTop: 5 }}>
                  <Col
                    style={{
                      alignItems: "center",
                      marginRight: 15,
                      width: 150,
                    }}
                  >
                    <Row
                      alignItems="center"
                      style={{ fontSize: 20, fontWeight: "bold" }}
                    >
                      Review
                    </Row>
                  </Col>
                  <Col>
                    <Rate count={5} disabled defaultValue={5} />
                  </Col>
                </Row>

                <Row style={{ marginTop: 15 }}>
                  <Col
                    style={{
                      alignItems: "center",
                      marginRight: 15,
                      width: 150,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Price Range
                    </Text>
                  </Col>

                  <Col>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#D74C7F",
                        width: "25%",
                      }}
                    >
                      {" "}
                      $100 - $2000
                    </Text>
                  </Col>
                </Row>

                <Row style={{ marginTop: 15 }}>
                  <Col style={{ fontSize: 20, fontWeight: "bold" }}>
                    My Work
                    <Carousel
                      responsive={responsive}
                      arrows={false}
                      swipeable={true}
                      partialVisibile={true}
                    >
                      {artwork.map((a) => {
                        return (
                          <div
                            onClick={() => onclickPic(a)}
                            style={{ marginRight: 10 }}
                          >
                            <img style={{ maxHeight: 167 }} src={a.url} />
                          </div>
                        );
                      })}
                    </Carousel>
                  </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                  <Col style={{ fontSize: 20, fontWeight: "bold" }}>
                    My Gallery
                    <Carousel
                      responsive={responsive}
                      arrows={false}
                      swipeable={true}
                      partialVisible={true}
                    >
                      <div style={{ background: "" }}>
                        <img src="./image 1.png" />
                      </div>

                      <div>
                        <img src="./Artwork.png" />
                      </div>
                      <div>
                        <img height="167" src="./artwork2.jpg" />
                      </div>
                      <div>
                        <img height="167" src="./artwork2.jpg" />
                      </div>
                    </Carousel>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Artwork" key="2" disabled>
                Artwork
              </TabPane>

              <TabPane tab="Gallery" key="3" disabled>
                <Carousel responsive={responsive} arrows={false}>
                  <div>Item 1</div>
                  <div>Item 2</div>
                  <div>Item 3</div>
                  <div>Item 4</div>
                </Carousel>
              </TabPane>
            </Tabs>
          </Row>

          <Modal
            title="Upload Artwork"
            visible={upload}
            onOk={() => setUpload(false)}
            footer={null}
            onCancel={() => {
              setUpload(false);
              setUploadDesc(null);
              setUploadTag([]);
              setUploadName(null);
            }}
          >
            Artwork Name
            <Input style={{ marginBottom: 5 }} onChange={onChangeUploadName} />
            Artwork Description
            <Input style={{ marginBottom: 5 }} onChange={onChangeUploadDesc} />
            Artwork Tag{" "}
            <Input
              style={{ marginBottom: 5 }}
              onChange={handleSearch}
              placeholder="Search tags"
            />
            {searchedTags.map((t) => {
              return <div onClick={() => addTag(uploadTag, t)}>{t.tagName}</div>;
            })}
            <Row style={{ marginBottom: 20 }}>
              {uploadTag.map((t) => {
                return (
                  <div
                    style={{
                      marginRight: 2,
                      height: 20,
                      color: "white",
                      background: "#4CD75F",
                      minWidth: 70,
                      fontSize: 9,
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      display: "flex",
                      borderRadius: 100000,
                    }}
                  >
                    <Row justify="space-between" style={{ width: "55%" }}>
                      <Col> {t.tagName} </Col>
                      <Col onClick={() => removeFromUploadTag(t)}>X</Col>
                    </Row>
                  </div>
                );
              })}
            </Row>
            <Row style={{ alignItems: "center", width: "100%" }}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                style={{ background: "green", alignSelf: "center" }}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                //beforeUpload={beforeUpload}
                //onChange={this.handleChange}
              >
                {/* {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )} */}
                Upload artwork
              </Upload>
              <Row justify="end" style={{ width: "100%", marginTop: 10 }}>
                <Button
                  type="round"
                  style={{
                    height: 32,
                    color: "white",
                    background: "#4CD75F",
                    minWidth: 45,
                    marginRight: 5,
                    border: "none",
                  }}
                  onClick={() =>
                    confirmUpload(uploadName, uploadDesc, uploadTag, uploadUrl)
                  }
                >
                  Submit <EditOutlined />
                </Button>
              </Row>
            </Row>
          </Modal>

          {active && (
            <Modal
              centered
              title={active.title}
              visible={active}
              onOk={() => setActive(null)}
              footer={null}
              onCancel={() => setActive(null)}
            >
              <Row style={{ marginBottom: 20 }}>
                <Col span={16}>
                  <img
                    style={{ maxHeight: "100%", width: "100%" }}
                    src={active.url}
                  />
                </Col>
                <Col
                  span={8}
                  style={{
                    paddingLeft: 10,
                    display: "flex",
                    alignItems: "center",
                    color: "grey",
                    fontSize: 16,
                  }}
                >
                  {" "}
                  {active.description}
                </Col>
              </Row>
              <Row
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  alignItems: "center",
                }}
              >
                {" "}
                <EyeOutlined style={{ marginRight: 5 }} /> Views: 9999
              </Row>
              <Row style={{ marginTop: 30, fontWeight: "bold", fontSize: 16 }}>
                {" "}
                Artwork Tag
              </Row>
              <Row style={{ marginBottom: 20 }}>
                {active.artTag.map((t) => {
                  return (
                    <Button
                      type="round"
                      style={{
                        marginRight: 2,
                        height: 20,
                        color: "white",
                        background: "#4CD75F",
                        minWidth: 45,
                        fontSize: 9,
                        border: "none",
                      }}
                    >
                      {t.tagName}
                    </Button>
                  );
                })}
              </Row>

              <Row justify="end">
                <Button
                  type="round"
                  style={{
                    height: 32,
                    color: "white",
                    background: "#4CD75F",
                    minWidth: 45,
                    marginRight: 5,
                    border: "none",
                  }}
                  onClick={() => {
                    console.log("active.artTag");
                    setEdit(true);
                  }}
                >
                  Edit <EditOutlined />
                </Button>
                <Button
                  type="round"
                  style={{
                    height: 32,
                    color: "white",
                    background: "#D74C7F",
                    minWidth: 45,
                    border: "none",
                  }}
                  onClick={() => setShowConfirmDelete(true)}
                >
                  Delete <DeleteOutlined />
                </Button>
              </Row>

              <Modal
                centered
                onCancel={() => setShowConfirmDelete(false)}
                visible={showConfirmDelete}
                title="Delete Confirmation"
                footer={null}
              >
                <Row
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
                >
                  Are you sure you want to delete this artwork?
                </Row>
                <Row>
                  <Checkbox> Do not show next time</Checkbox>
                </Row>
                <Row style={{ width: "100%", marginTop: 25 }}>
                  <Col span={12}>
                    <Button
                      type="round"
                      style={{
                        width: "95%",
                        color: "white",
                        background: "#4CD75F",
                        border: "none",
                      }}
                      onClick={() => setShowConfirmDelete(false)}
                    >
                      Cancel <CloseCircleOutlined />
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      type="round"
                      style={{
                        color: "white",
                        background: "#D74C7F",
                        width: "95%",
                        border: "none",
                      }}
                      onClick={() => confirmDelete(active.artworkID)}
                    >
                      Delete <DeleteOutlined />
                    </Button>
                  </Col>
                </Row>
              </Modal>

              <Modal
                centered
                onCancel={() => setShowCompleteDelete(false)}
                visible={showCompleteDelete}
                title="Delete Completed"
                footer={null}
              >
                <Row
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
                >
                  Artwork has been deleted.
                </Row>

                <Row style={{ width: "100%", marginTop: 25 }}>
                  <Col span={24}>
                    <Button
                      type="round"
                      style={{
                        width: "95%",
                        color: "white",
                        background: "#4CD75F",
                        border: "none",
                      }}
                      onClick={() => {
                        setShowCompleteDelete(false);
                        setShowConfirmDelete(false);
                        setActive(null);
                      }}
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </Modal>
            </Modal>
          )}
          {active && (
            <Modal
              title="Edit Artwork"
              visible={edit}
              onOk={() => setEdit(false)}
              footer={null}
              onCancel={() => {
                setEdit(false);
                setEditUrl();
                setEditName(null);
                setEditDesc(null);
              }}
            >
              Artwork Name
              <Input
                style={{ marginBottom: 5 }}
                placeholder={active.title}
                onChange={onChangeEditName}
              />
              Artwork Description
              <Input
                style={{ marginBottom: 5 }}
                placeholder={active.description}
                onChange={onChangeEditDesc}
              />
              Artwork Tag{" "}
              <Input
                style={{ marginBottom: 5 }}
                onChange={handleSearch}
                placeholder="Search tags"
              />
              {searchedTags.map((t) => {
                return <div onClick={() => addTag(editTag, t)}>{t.tagName}</div>;
              })}
              <Row style={{ marginBottom: 10 }}>
                {editTag.map((t) => {
                  return (
                    <div
                      style={{
                        marginRight: 2,
                        height: 20,
                        color: "white",
                        background: "#4CD75F",
                        width: "fit-content",
                        minWidth: 70,
                        fontSize: 9,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        display: "flex",
                        borderRadius: 100000,
                      }}
                    >
                      <Row justify="space-between" style={{ width: "55%" }}>
                        <Col> {t.tagName} </Col>
                        <Col onClick={() => removeFromEditTag(t)}>X</Col>
                      </Row>
                    </div>
                  );
                })}
              </Row>
              <Row
                style={{
                  alignItems: "center",
                  width: "100%",
                  marginTop: 30,
                  marginBottom: 40,
                }}
              >
                <img style={{ width: "100%" }} src={active.url} />
              </Row>
              <Row justify="end">
                <Button
                  type="round"
                  style={{
                    color: "white",
                    background: "#4CD75F",
                    border: "none",
                  }}
                  onClick={() => setShowConfirmEdit(true)}
                >
                  Submit
                </Button>
              </Row>
              <Modal
                centered
                onCancel={() => setShowConfirmEdit(false)}
                visible={showConfirmEdit}
                title="Edit Confirmation"
                footer={null}
              >
                <Row
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
                >
                  Are you sure you want to save the change?
                </Row>
                <Row>
                  <Checkbox> Do not show next time</Checkbox>
                </Row>
                <Row style={{ width: "100%", marginTop: 25 }}>
                  <Col span={12}>
                    <Button
                      type="round"
                      style={{
                        width: "95%",
                        color: "white",
                        background: "#4CD75F",
                        border: "none",
                      }}
                      onClick={() => setShowConfirmEdit(false)}
                    >
                      Cancel <CloseCircleOutlined />
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      type="round"
                      style={{
                        color: "white",
                        background: "#D74C7F",
                        width: "95%",
                        border: "none",
                      }}
                      onClick={() =>
                        confirmEdit(
                          active.artworkID,
                          editName,
                          editDesc,
                          editTag,
                          editUrl
                        )
                      }
                    >
                      Save <EditOutlined />
                    </Button>
                  </Col>
                </Row>
              </Modal>
              <Modal
                centered
                onCancel={() => setShowCompleteEdit(false)}
                visible={showCompleteEdit}
                title="Edit Completed"
                footer={null}
              >
                <Row
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
                >
                  Artwork has been edited.
                </Row>

                <Row style={{ width: "100%", marginTop: 25 }}>
                  <Col span={24}>
                    <Button
                      type="round"
                      style={{
                        width: "95%",
                        color: "white",
                        background: "#4CD75F",
                        border: "none",
                      }}
                      onClick={() => {
                        setShowCompleteEdit(false);
                        setShowConfirmEdit(false);
                        setActive(null);
                      }}
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </Modal>
            </Modal>
          )}
        </Content>
      )}
    </Layout>
  );
};

export default Profile;
