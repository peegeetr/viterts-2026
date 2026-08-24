import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GeneratedEmailSignature } from "./GeneratedEmailSignature";
import type { ApiResponse, FormData } from "./emailSignatureTypes";
import { FormEmailSignature } from "./FormEmailSignature";
import { FormTest } from "./FormTest";

// export interface ApiResponse {
//   count: number;
//   success: boolean;
//   data: [
//     {
//       employee_photo: string;
//       employee_work_email: string;
//     },
//   ];
// }

// interface FormData {
//   name: string;
//   jobTitle: string;
//   email: string;
// }

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email.trim()) return;
    refetch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        {/* <h2
          style={{
            fontSize: "20px",
          }}
        >
          Please provide the following information to generate your email
          signature.
        </h2> */}
        <FormTest />
        {/* <FormEmailSignature /> */}
        {/* <form onSubmit={handleSubmit} className="mt-5">
          <label
            style={{
              display: "block",
            }}
            htmlFor="name"
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
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label
            style={{
              display: "block",
            }}
            htmlFor="job-title"
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
            id="job-title"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <label
            style={{
              display: "block",
            }}
            htmlFor="email"
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
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
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
        </form> */}
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
          }}
        >
          <p>Processing...</p>
        </div>
      )}
      {/* Email signature */}
      {data && !isFetching && data?.count > 0 && (
        <>
          <div ref={contentRef}>
            <GeneratedEmailSignature />
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
        // <section
        //   style={{
        //     marginTop: "40px",
        //     backgroundColor: "#f3f5f6",
        //     borderRadius: "1rem",
        //     fontSize: "14px",
        //     padding: "25px",
        //   }}
        // >
        //   <div ref={contentRef}>
        //     {/* Signature left info */}
        //     <div
        //       style={{
        //         display: "flex",
        //         gap: "20px",
        //       }}
        //     >
        //       <img
        //         style={{
        //           borderRadius: "9999px",
        //           width: "6rem",
        //           height: "6rem",
        //         }}
        //         src={
        //           data.data?.[0]?.employee_photo === ""
        //             ? `${imgUrl}/${data.data?.[0]?.employee_photo}`
        //             : `${imgUrl}/${data.data?.[0]?.employee_photo}`
        //         }
        //         alt="employee headshot"
        //       />

        //       <div style={{ lineHeight: "22px" }}>
        //         <span style={{ fontWeight: "600" }}>{formData.name}</span>
        //         <br />
        //         <span>{formData.jobTitle}</span>
        //         <img
        //           style={{ width: "130px", height: "30px", marginTop: "5px" }}
        //           src={`${imgUrl}/fbs-logo-FBS001.png`}
        //           alt="fbs company logo"
        //         />
        //       </div>
        //       {/* Signature right info */}
        //       <div
        //         style={{
        //           borderLeft: "3px solid gray",
        //           paddingLeft: "20px",
        //           height: "90px",
        //           lineHeight: "22px",
        //         }}
        //       >
        //         <div
        //           style={{
        //             display: "flex",
        //             gap: "10px",
        //             alignItems: "center",
        //           }}
        //         >
        //           <img
        //             src="https://demo.frontlinebusiness.com.ph/dev/signature/img/mail.png"
        //             alt="email icon"
        //             style={{
        //               width: "12px",
        //               height: "12px",
        //             }}
        //           />
        //           <span>{data.data?.[0]?.employee_work_email}</span>
        //         </div>
        //         <div
        //           style={{
        //             display: "flex",
        //             gap: "10px",
        //             alignItems: "center",
        //           }}
        //         >
        //           <img
        //             src="https://demo.frontlinebusiness.com.ph/dev/signature/img/globe.png"
        //             alt="web icon"
        //             style={{ width: "12px", height: "12px" }}
        //           />
        //           <span>frontlinebusiness.com.ph/</span>
        //         </div>
        //         <div
        //           style={{
        //             display: "flex",
        //             gap: "10px",
        //             alignItems: "center",
        //           }}
        //         >
        //           <img
        //             src="https://demo.frontlinebusiness.com.ph/dev/signature/img/phone.png"
        //             alt="moible icon"
        //             style={{ width: "12px", height: "12px" }}
        //           />
        //           <span>(+63) 927 168 6810</span>
        //         </div>
        //         <div
        //           style={{
        //             display: "flex",
        //             gap: "10px",
        //             alignItems: "center",
        //           }}
        //         >
        //           <img
        //             src="https://demo.frontlinebusiness.com.ph/dev/signature/img/phone.png"
        //             alt="landline icon"
        //             style={{ width: "12px", height: "12px" }}
        //           />
        //           <span>(049) 530-2112</span>
        //         </div>
        //       </div>
        //     </div>
        //     {/* Confidentiality Notice */}
        //     <div
        //       style={{
        //         marginTop: "40px",
        //       }}
        //     >
        //       <p
        //         style={{
        //           fontSize: "11px",
        //         }}
        //       >
        //         <span
        //           style={{
        //             color: "#60a5fa",
        //           }}
        //         >
        //           CONFIDENTIALITY NOTICE:{" "}
        //         </span>
        //         The contents of this email message and any attachments are
        //         intended solely for the addressee(s) and may contain
        //         confidential and/or privileged information and may be legally
        //         protected from disclosure. If you are not the intended recipient
        //         of this message or their agent, or if this message has been
        //         addressed to you in error, please immediately alert the sender
        //         by reply email and then delete this message and any attachments.
        //         If you are not the intended recipient, you are hereby notified
        //         that any use, dissemination, copying, or storage of this message
        //         or its attachments is strictly prohibited.
        //       </p>
        //     </div>
        //   </div>

        //   {/* Action to copy */}
        //   <div
        //     style={{
        //       marginTop: "20px",
        //     }}
        //   >
        //     <button
        //       onClick={handleCopy}
        //       style={{
        //         border: "1px solid gray",
        //         padding: "0 5px 3px 5px",
        //       }}
        //     >
        //       {copied ? "Copied!" : "Copy"}
        //     </button>
        //   </div>
        // </section>
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
          <p>Email does not exist. Please use the provided company email.</p>
        </div>
      )}
    </div>
  );
}
