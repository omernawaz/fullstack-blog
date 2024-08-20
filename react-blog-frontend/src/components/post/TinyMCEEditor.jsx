import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEEditor({ value, onChange, name }) {
  return (
    <Editor
      apiKey="xsheyp0ex8257qptpi35fjhayrvtdzk4f3esc8ocnazjsirt"
      value={value}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      onEditorChange={(content) =>
        onChange({ target: { name, value: content } })
      }
    />
  );
}
