import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const UploadComponent = ({ onImageUpload }) => {
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [visibility, setVisibility] = useState("private");
  const { t, i18n } = useTranslation();

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.checked ? "public" : "private");
  };

  const handleImageUpload = async (
    file,
    imageName,
    description,
    visibility
  ) => {
    if (!file) {
      alert(t("uploadComponent:alertSelectImage"));
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageName", imageName);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("visibility", visibility);

    try {
      await axios.post("/api/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (onImageUpload) {
        onImageUpload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.image.files[0];
    const imageName = event.target.imageName.value;
    const description = event.target.description.value;

    setUploading(true);
    handleImageUpload(file, imageName, description, visibility).finally(() =>
      setUploading(false)
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="UploadComponent-alert">
        {t("uploadComponent:alertLogin")}
      </div>
    );
  }

  const isRtlLanguage = () => {
    const rtlLanguages = ["ar"];
    return rtlLanguages.includes(i18n.language);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("uploadComponent:tooltipVisibility")}
    </Tooltip>
  );

  return (
    <div
      className={`UploadComponent-container ${isRtlLanguage() ? "rtl" : ""}`}
    >
      <Form onSubmit={handleSubmit} className="UploadComponent-form">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{t("uploadComponent:labelImage")}</Form.Label>
          <Form.Control type="file" name="image" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("uploadComponent:labelImageName")}</Form.Label>
          <Form.Control
            type="text"
            name="imageName"
            placeholder={t("uploadComponent:placeholderImageName")}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("uploadComponent:labelDescription")}</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder={t("uploadComponent:placeholderDescription")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="visibility-switch"
            label={
              visibility === "public"
                ? t("uploadComponent:visibilityPublic")
                : t("uploadComponent:visibilityPrivate")
            }
            onChange={handleVisibilityChange}
            checked={visibility === "public"}
          />
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span className="ms-2 info-icon">ℹ️</span>
          </OverlayTrigger>
        </Form.Group>
        <button type="submit" className="UploadComponent-button">
          {t("uploadComponent:buttonUpload")}
        </button>
      </Form>
      {uploading && <div>{t("uploadComponent:uploadingMessage")}</div>}
    </div>
  );
};

UploadComponent.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default UploadComponent;
