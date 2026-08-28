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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

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
    <div className="bg-slate-50 flex justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-xl mt-20 space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-2xl mb-4 shadow-sm shadow-indigo-100">
            <img
              src="https://myfbsapp.com/v2/img/fbs-logo-FBS001.png"
              alt="fbs company logo"
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Email Signature Generator
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please provide the following information to generate your email
            signature.
          </p>
        </div>
        {/* Form section */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-5"
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
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2"
                    htmlFor={field.name}
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
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
                    <em
                      style={{
                        color: "red",
                        fontSize: "12px",
                        display: "block",
                        textAlign: "right",
                      }}
                    >
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
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2"
                    htmlFor={field.name}
                  >
                    Job Title
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                    id={field.name}
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={curriedHandleChange(field)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em
                      style={{
                        color: "red",
                        fontSize: "12px",
                        display: "block",
                        textAlign: "right",
                      }}
                    >
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
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2"
                    htmlFor={field.name}
                  >
                    Company Email
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                    id={field.name}
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={curriedHandleChange(field)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em
                      style={{
                        color: "red",
                        fontSize: "12px",
                        display: "block",
                        textAlign: "right",
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </>
              );
            }}
          </Field>
          <button
            type="submit"
            className="w-full mt-2 bg-[#b01e76] hover:bg-[#b01e76]/90 active:bg-[#b01e76]/80 text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-center cursor-pointer"
          >
            {isFetching ? "Please wait..." : "Generate"}
          </button>
        </form>
        {/* </section> */}
        {/* Generated section */}
        {/* Loader */}

        <div className="min-h-[250px]">
          {isFetching && (
            <div
              style={{
                // border: "1px solid gray",
                backgroundColor: "#f3f5f6",
                marginTop: "40px",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <p>Processing...</p>
            </div>
          )}
          {/* Email signature */}
          {data && !isFetching && data?.count > 0 && (
            <>
              <div
                ref={contentRef}
                className="border border-emerald-100 rounded-2xl p-6 shadow-md transition-all duration-300"
              >
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
                  className="bg-[#b01e76] hover:bg-[#b01e76]/90 active:bg-[#b01e76]/80 text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-center cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </>
          )}
          {/* Error */}
          {isError && !isFetching && (
            <div className="mt-10 p-5 bg-[#f3f5f6] rounded-2xl text-red-700">
              Error loading data: {error.message}
            </div>
          )}
          {/* Email not exist */}
          {data && !isFetching && data?.count === 0 && (
            <div className="mt-10 p-5 bg-[#f3f5f6] rounded-2xl text-red-700">
              <p>
                Email does not exist. Please use the provided company email.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
