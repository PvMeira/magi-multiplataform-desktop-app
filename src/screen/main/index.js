import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import FolderSelection from "../../components/folder-selection";
import { godFunction } from "../../utils/filesUtils.js";

function Main() {
  const [validated, setValidated] = useState(false);
  const [targetFiles, setTargetFiles] = useState([]);
  const [folderLocation, setFolderLocation] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const execute = () => {
    const resultList = targetFiles.map((file) => {
      const { process, message } = godFunction(
        file.name,
        folderLocation,
        name,
        value
      );
      file.status = process ? "SUCCESS" : "ERROR";
      file.errorDetail = process ? undefined : message;
      return file;
    });
    setTargetFiles(resultList);
    console.log("result ", resultList);
  };

  const resetAll = () => {
    setValidated(false);
    setTargetFiles([]);
    setFolderLocation("");
    setName('');
    setValue('')
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
    }
  };

  const handleFolderSelection = (event) => {
    console.log("Files ===  === ", event.files);
    setTargetFiles(event.files.map((a) => ({ name: a, status: "PENDING" })));
    console.log("Location = ", event.folderLocation);
    setFolderLocation(event.folderLocation);
  };

  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: "center" }}>
          Add a new property to the Translations Files.
        </h1>
      </Row>

      <br />
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onChange={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formPropertyName">
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Here goes the property name.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPropertyValue">
          <Form.Label>Property Value</Form.Label>
          <Form.Control
            type="text"
            required
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Here goes the property value.
          </Form.Text>
        </Form.Group>
        <br />
        <Row className="justify-content-md-center">
          <FolderSelection
            disable={validated}
            selectionCallback={handleFolderSelection}
          />
        </Row>
      </Form>
      <br />
      {targetFiles.length > 0 && (
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {targetFiles.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <Alert
                      variant={
                        item.status === "PENDING"
                          ? "primary"
                          : item.status === "ERROR"
                          ? "danger"
                          : "success"
                      }
                    >
                      {item.status}
                    </Alert>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <Row className="justify-content-md-center">
            <Button variant="primary" onClick={execute}>
              {" "}
              Execute Addition to Files
            </Button>
          </Row>

          <br />
          <Row className="justify-content-md-center">
            <Button variant="secondary" onClick={resetAll}>
              New Execution
            </Button>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default Main;
