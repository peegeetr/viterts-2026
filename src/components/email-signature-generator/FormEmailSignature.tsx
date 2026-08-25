import { useForm } from "@tanstack/react-form";

export function FormEmailSignature() {
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      jobTitle: "",
      // terms: false,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <section className="mt-15">
      <h2 className="text-xl">
        Please provide the following information to generate your email
        signature.
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Field name="name">
          {(field) => (
            <TextField
              field={field}
              type="name"
              placeholder="name"
              label="Name"
            />
          )}
        </Field>
        <Field name="jobTitle">
          {(field) => (
            <TextField
              field={field}
              type="jobTitle"
              placeholder="Job title"
              label="Job Title"
            />
          )}
        </Field>
        <Field name="email">
          {(field) => (
            <TextField
              field={field}
              type="email"
              placeholder="Email"
              label="Company Email"
            />
          )}
        </Field>
        <button className="block border border-gray-400" type="submit">
          Generate
        </button>
      </form>
    </section>
  );
}
