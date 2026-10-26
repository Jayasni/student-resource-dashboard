
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { validateFile } from "../utils/validateFile";

export default function UploadResource() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selected = event.currentTarget.files?.[0];

    if (!selected) return;

    const validationError = validateFile(selected);

    if (validationError) {
      setFile(null);
      setError(validationError);
      setStatus("");
      event.currentTarget.value = "";
      return;
    }

    setFile(selected);
    setError("");
    setStatus("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "student-resources");

    setStatus("Ready to upload");
    console.log("FormData prepared for upload:", file.name);

    // A real upload needs a backend endpoint.
    // Do not send FormData to the mock JSON API.
  }

  return (
    <form className="upload-panel" onSubmit={handleSubmit}>
      <h2>Upload learning material</h2>

      <label htmlFor="resource-file">Choose a file</label>
      <input
        id="resource-file"
        type="file"
        accept=".pdf,image/png,image/jpeg"
        onChange={handleFileChange}
      />

      {file && (
        <p>
          {file.name} — {(file.size / 1024).toFixed(1)} KB
        </p>
      )}

      {preview && (
        <img
          className="image-preview"
          src={preview}
          alt="Selected image preview"
        />
      )}

      {error && <p className="error">{error}</p>}
      {status && <p role="status">{status}</p>}

      <button type="submit" disabled={!file}>
        Prepare upload
      </button>
    </form>
  );
}
