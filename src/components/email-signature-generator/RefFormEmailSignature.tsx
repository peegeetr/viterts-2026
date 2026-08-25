import { useForm } from "@tanstack/react-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Required value."),
  jobTitle: z.string().min(1, "Required value."),
  email: z.email(),
  // terms: z.boolean().refine((val) => val === true, {
  //   message: "You must accept the terms and conditions",
  // }),
});

type FieldProps<T extends string | number> = {
  state: { value: T; meta: { errors: any[]; isTouched: boolean } };
  handleChange: (value: T) => void;
  handleBlur: () => void;
};

function TextField<T extends string | number>({
  field,
  type,
  placeholder,
  label,
}: {
  field: FieldProps<T>;
  type?: string;
  placeholder?: string;
  label: string;
}) {
  const { errors, isTouched } = field.state.meta;
  return (
    <div>
      <label className="block" htmlFor="name">
        {label}
      </label>
      <input
        className="border border-gray-400 rounded-md"
        type={type}
        value={field.state.value as string | number}
        onChange={(e) =>
          field.handleChange(
            (type === "number"
              ? Number(e.target.value)
              : e.target.value) as Parameters<typeof field.handleChange>[0],
          )
        }
        onBlur={field.handleBlur}
        placeholder={placeholder}
      />
      {errors.length > 0 && isTouched && (
        <span className="text-red-500">{errors[0]?.message}</span>
      )}
    </div>
  );
}

// function CheckboxField<T extends boolean>({
//   field,
//   type,
//   label,
// }: {
//   field: FieldProps<T>;
//   type?: string;
//   label: string;
// }) {
//   const { errors, isTouched } = field.state.meta;
//   console.log(errors);
//   return (
//     <div>
//       <label className="block" htmlFor="terms">
//         {label}
//       </label>
//       <input
//         className="border border-gray-400 rounded-md"
//         type={type}
//         checked={field.state.value} // Coerces undefined safely to a boolean structure
//         onBlur={field.handleBlur}
//         onChange={(e) =>
//           field.handleChange(
//             e.target.checked as Parameters<typeof field.handleChange>[0],
//           )
//         }
//       />
//       {errors.length > 0 && isTouched && (
//         <span className="text-red-500">{errors[0]?.message}</span>
//       )}
//     </div>
//   );
// }

export function RefFormEmailSignature() {
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
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
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
        {/* <Field name="terms">
          {(field) => (
            <CheckboxField
              field={field}
              type="checkbox"
              label="Accept terms and conditions"
            />
          )}
        </Field> */}
        <button className="block border border-gray-400" type="submit">
          Generate
        </button>
      </form>
    </section>
  );
}
