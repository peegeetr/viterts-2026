import React from "react";
import { useForm } from "@tanstack/react-form";

export function FormTest() {
  // 1. Initialize the form model. Types are inferred from defaultValues.
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      // Executed only if validation passes
      console.log("Submitted values:", value);
    },
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Create Account</h2>

      {/* 2. Bind the form submission handler */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* 3. Render the Name field */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Name is required"
                : value.length < 3
                  ? "Name must be at least 3 characters"
                  : undefined,
          }}
        >
          {(field) => {
            console.log(field.state.meta.errors);
            return (
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor={field.name}
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                  }}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em style={{ color: "red", fontSize: "12px" }}>
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            );
          }}
        </form.Field>

        {/* 4. Render the Email field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Email is required"
                : !/\S+@\S+\.\S+/.test(value)
                  ? "Invalid email address"
                  : undefined,
          }}
        >
          {(field) => (
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor={field.name}
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Email
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em style={{ color: "red", fontSize: "12px" }}>
                  {field.state.meta.errors.join(", ")}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* 5. Handle submission states reactively */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: canSubmit ? "#0070f3" : "#ccc",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
