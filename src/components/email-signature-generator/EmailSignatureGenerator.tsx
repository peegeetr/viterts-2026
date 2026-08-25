import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GeneratedEmailSignature } from "./GeneratedEmailSignature";
import type { ApiResponse, FormData } from "./emailSignatureTypes";
import { useForm } from "@tanstack/react-form";

export function EmailSignatureGenerator() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    jobTitle: "",
    email: "",
  });
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_APP_API_URL as string;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION as string;

  const fetchApi = async (): Promise<ApiResponse> => {
    const username = import.meta.env.VITE_APP_API_KEY;
    const password = "";
    const auth = btoa(`${username}:${password}`);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + auth);
    myHeaders.append("Content-Type", "application/json");

    const options = {
      method: "post",
      headers: myHeaders,
      body: JSON.stringify(formData),
    };

    const res = await fetch(
      `${apiUrl}/${apiVersion}/controllers/admin/employee/email-signature/get-signature-by-email.php`,
      options,
    );

    if (!res.ok) {
      throw new Error("Network response was not ok.");
    }

    return res.json();
  };

  const { data, error, isFetching, isError, refetch } = useQuery({
    queryKey: ["test"],
    queryFn: fetchApi,
    enabled: false, // disable auto-fetching on mound and dependecy changes
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const curriedHandleChange =
    (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      field.handleChange(value);
    };

  const handleCopy = async () => {
    if (!contentRef.current) return;

    try {
      // 1. Grab raw HTML string (including any inline styling definitions)
      const rawHtml = contentRef.current.innerHTML;

      // 2. Format a plain text fallback for apps that don't read rich content
      const plainText = contentRef.current.innerText;

      // 3. Assemble both payloads as Blobs
      const htmlBlob = new Blob([rawHtml], { type: "text/html" });
      const textBlob = new Blob([plainText], { type: "text/plain" });

      // 4. Safely push the native ClipboardItem payload into browser system storage
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        }),
      ]);

      // 5. Update user interface indicator
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy rich text markup: ", error);
    }
  };

  // const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!formData.email.trim()) return;
  //   refetch();
  // };

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      jobTitle: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      refetch();
    },
  });

  return (
    <div className="">
      <header
        style={{
          marginTop: "80px",
        }}
      >
        <img
          src="https://myfbsapp.com/v2/img/fbs-logo-FBS001.png"
          alt="fbs company logo"
        />
        <h1
          style={{
            fontSize: "30px",
            marginTop: "20px",
            fontWeight: "400",
          }}
        >
          Email Signature Generator
        </h1>
      </header>
      {/* Form section */}
      <section
        style={{
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
          }}
        >
          Please provide the following information to generate your email
          signature.
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-5"
        >
          <Field
            name="name"
            validators={{
              onBlur: ({ value }) =>
                !value
                  ? "Name is required."
                  : value.length < 1
                    ? "Name must be at least 3 characters"
                    : undefined,
            }}
          >
            {(field) => {
              return (
                <>
                  <label
                    style={{
                      display: "block",
                    }}
                    htmlFor={field.name}
                  >
                    Name
                  </label>
                  <input
                    style={{
                      display: "block",
                      border: "1px solid gray",
                      padding: "0 8px 3px 5px",
                      borderRadius: "5px",
                    }}
                    id={field.name}
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={curriedHandleChange(field)}
                    // onChange={(e) => {
                    //   const { name, value } = e.target;
                    //   setFormData((prev) => ({
                    //     ...prev,
                    //     [name]: value,
                    //   }));
                    //   field.handleChange(value);
                    // }}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em style={{ color: "red", fontSize: "12px" }}>
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </>
              );
            }}
          </Field>
          <Field
            name="jobTitle"
            validators={{
              onBlur: ({ value }) =>
                !value ? "Job title is required." : undefined,
            }}
          >
            {(field) => {
              return (
                <>
                  <label
                    style={{
                      display: "block",
                    }}
                    htmlFor={field.name}
                  >
                    Job Title
                  </label>
                  <input
                    style={{
                      display: "block",
                      border: "1px solid gray",
                      padding: "0 8px 3px 5px",
                      borderRadius: "5px",
                    }}
                    id={field.name}
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={curriedHandleChange(field)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em style={{ color: "red", fontSize: "12px" }}>
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </>
              );
            }}
          </Field>
          <Field
            name="email"
            validators={{
              onBlur: ({ value }) => !value && "Email is required",
            }}
          >
            {(field) => {
              return (
                <>
                  <label
                    style={{
                      display: "block",
                    }}
                    htmlFor={field.name}
                  >
                    Company Email
                  </label>
                  <input
                    style={{
                      display: "block",
                      border: "1px solid gray",
                      padding: "0 8px 3px 5px",
                      borderRadius: "5px",
                    }}
                    id={field.name}
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onChange={curriedHandleChange(field)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em style={{ color: "red", fontSize: "12px" }}>
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </>
              );
            }}
          </Field>
          <button
            type="submit"
            style={{
              display: "block",
              border: "1px solid gray",
              padding: "0 8px 3px 5px",
              marginTop: "20px",
            }}
          >
            {isFetching ? "Please wait..." : "Generate"}
          </button>
        </form>
      </section>
      {/* Generated section */}
      {/* Loader */}
      {isFetching && (
        <div
          style={{
            // border: "1px solid gray",
            backgroundColor: "#f3f5f6",
            marginTop: "40px",
            padding: "20px",
            borderRadius: "10px",
            width: "800px",
          }}
        >
          <p>Processing...</p>
        </div>
      )}
      {/* Email signature */}
      {data && !isFetching && data?.count > 0 && (
        <>
          <div ref={contentRef}>
            <GeneratedEmailSignature
              name={formData.name}
              jobTitle={formData.jobTitle}
              email={formData.email}
              photo={data.data[0].employee_photo}
            />
          </div>
          {/* Action to copy */}
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <button
              onClick={handleCopy}
              style={{
                border: "1px solid gray",
                padding: "0 5px 3px 5px",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </>
      )}
      {/* Error */}
      {isError && !isFetching && (
        <div className="mt-10 p-5 bg-[#f3f5f6] rounded-2xl text-red-700 w-[800px]">
          Error loading data: {error.message}
        </div>
      )}
      {/* Email not exist */}
      {data && !isFetching && data?.count === 0 && (
        <div className="mt-10 p-5 bg-[#f3f5f6] rounded-2xl text-red-700 w-[800px]">
          <p>Email does not exist. Please use the provided company email.</p>
        </div>
      )}
    </div>
  );
}
