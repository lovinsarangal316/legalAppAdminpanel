// import React from "react";
// import { useField } from "formik";
// import { Form } from "react-bootstrap";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { sanitizeQuillValue } from "../helper";

// const CmsEditor = ({ label, name }) => {
//   const [field, meta, helpers] = useField(name);
//   const { setValue } = helpers;
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//   ];

//   const handleChange = (content) => {
//     const sanitizedContent = sanitizeQuillValue(content);
//     setValue(sanitizedContent); // Update Formik state
//   };

//   return (
//     <Form.Group className="mb-3">
//       <Form.Label className="fw-bold text-uppercase">{label}</Form.Label>
//       <ReactQuill
//         theme="snow"
//         value={field.value}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//       />
//       {meta.touched && meta.error && (
//         <small className="text-danger">{meta.error}</small>
//       )}
//     </Form.Group>
//   );
// };

// export default CmsEditor;

import React, { useRef } from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { sanitizeQuillValue } from "../helper";

const CmsEditor = ({ label, name, setCount, flag }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleChange = (content, delta, source) => {
    if (flag) {
      if (source === "user") {
        const textOnly = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
        setCount(textOnly.length);
        if (textOnly.length <= 300) {
          setValue(sanitizeQuillValue(content)); // Save the valid content
        } else {
          // Prevent extra characters
          const quill = quillRef.current.getEditor();
          quill.deleteText(300, quill.getLength());
        }
      }
    } else {
      const sanitizedContent = sanitizeQuillValue(content);
      setValue(sanitizedContent); // Update Formik state
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold text-uppercase">{label}</Form.Label>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={field.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      {meta.touched && meta.error && (
        <small className="text-danger">{meta.error}</small>
      )}
    </Form.Group>
  );
};

export default CmsEditor;
