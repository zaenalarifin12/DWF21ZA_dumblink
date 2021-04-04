const onChange = (e) => {
    let tempForm = { ...form };

    if (e.target.type === "file") {
      tempForm[e.target.name] = e.target.files[0];

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        if (e.target.name == "image") {
          setImageForm({
            ...imageForm,
            imagePreviewUrl: reader.result,
          });
        } else {
          let preview = e.target.name;
          setImageForm({
            ...imageForm,
            preview: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      tempForm[e.target.name] = e.target.value;
    }

    console.log(tempForm);
    setForm(tempForm);
  };
