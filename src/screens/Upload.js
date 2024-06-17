import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import SubmitButton from "../components/auth/SubmitButton";

const UPLOAD_MUTATION = gql`
  mutation UploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
    }
  }
`;

function Upload() {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onBlur",
  });

  const clearUploadFormError = () => {
    clearErrors("result");
  };

  const onCompleted = (data) => {
    console.log(data);
    const { id } = data;

    if (!id) {
      setError("result", { message: "Upload Error" });
    }
  };

  const [uploadPhoto, { loading }] = useMutation(UPLOAD_MUTATION, {
    onCompleted,
    context: {},
  });

  const onSubmitValid = (data) => {
    // console.log(data);
    if (loading) {
      return;
    }
    const { caption, photo } = getValues();
    const file = photo[0];
    console.log(file);
    uploadPhoto({ variables: { file, caption } });
  };

  return (
    <div>
      <header>Create new post</header>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            name="caption"
            type="text"
            placeholder="Caption"
            ref={register({ required: "Caption is required." })}
            hasError={Boolean(errors?.caption?.message)}
            onChange={clearUploadFormError}
          />
          <FormError message={errors?.caption?.message} />
          <Input
            type="file"
            accept="image/*"
            name="photo"
            ref={register({ required: "Photo is required." })}
            hasError={Boolean(errors?.photo?.message)}
            onChange={clearUploadFormError}
          />
          <FormError message={errors?.photo?.message} />
          <SubmitButton
            type="submit"
            value={loading ? "Uploading..." : "Upload"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </div>
  );
}

export default Upload;
