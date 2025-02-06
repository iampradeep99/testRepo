import React, { useEffect } from "react";
import { Modal, Form } from "Framework/Components/Layout";
import PropTypes from "prop-types";
import { Button } from "Framework/Components/Widgets";
import SubMenuPopUpLogics from "./Logic/Logic";

function SubMenuPopUp({ isEditMode, menuData, showfunc, updateMenuList }) {
  const { formValues, updateState, btnloaderActive, handleSave, setModalData, formValidationError } = SubMenuPopUpLogics();

  useEffect(() => {
    setModalData({ isEditMode, menuData });
  }, [isEditMode]);

  return (
    <Modal
      onSubmit={(e) => handleSave(e, updateMenuList, showfunc)}
      varient="bottom"
      title={isEditMode ? "Edit Menu" : "Add New Menu"}
      show={showfunc}
      width="400px"
      right="6px"
    >
      <Modal.Body>
        <Form>
          <Form.Group column={1} controlwidth="300px">
            <Form.InputGroup label="Menu Heading" errorMsg="">
              <Form.InputControl control="input" type="text" autoComplete="off" value={menuData.MenuName} disabled />
            </Form.InputGroup>
            <Form.InputGroup label="Has Child" LabelReq="false" Col="1" htmlFor="HasChild_Check">
              <Form.InputControl
                disabled={isEditMode}
                checked={formValues.radioHasChild}
                name="radioHasChild"
                onChange={(e) => updateState(e.target.name, !formValues.radioHasChild)}
                control="switch"
                id="HasChild_Check"
              />
            </Form.InputGroup>
            <Form.InputGroup label="Menu Name" errorMsg={formValidationError["txtMenuName"]}>
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                name="txtMenuName"
                value={formValues.txtMenuName}
                onChange={(e) => updateState(e.target.name, e.target.value)}
                placeholder="Enter Menu Name"
              />
            </Form.InputGroup>
            <Form.InputGroup label="Url" errorMsg={formValidationError["txtReactUrl"]}>
              <Form.InputControl
                control="input"
                type="text"
                disabled={formValues.radioHasChild === true}
                value={formValues.txtReactUrl}
                name="txtReactUrl"
                onChange={(e) => updateState(e.target.name, e.target.value)}
                autoComplete="off"
                placeholder="Enter React Url"
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button varient="secondary" type="submit" trigger={btnloaderActive}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SubMenuPopUp;

SubMenuPopUp.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  menuData: PropTypes.object,
  showfunc: PropTypes.func.isRequired,
  updateMenuList: PropTypes.func.isRequired,
};
