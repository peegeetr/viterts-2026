import React from "react";
import { useQuery } from "@tanstack/react-query";

export interface ApiResponse {
  count: number;
  success: boolean;
  data: [];
}

interface FormData {
  overview_subscriber_code: string;
  overview_subscriber_id: string;
  email: string;
}

export function EmailSignatureGenerator() {
  const [formData, setFormData] = React.useState<FormData>({
    overview_subscriber_code: "",
    overview_subscriber_id: "",
    email: "",
  });
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;

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
      // body: JSON.stringify({
      //   overview_subscriber_code: "fbs001",
      //   overview_subscriber_id: "1",
      //   email: "1",
      // }),
    };

    const res = await fetch(
      `${apiUrl}/${apiVersion}/client-overview/read-fbs-leave-by-current-date`,
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

  console.log(data?.data?.[0]?.employee_photo);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!formData.email.trim()) return;
    refetch();
    // console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <header className="mt-20">
        <img
          src="https://myfbsapp.com/v2/img/fbs-logo-FBS001.png"
          alt="fbs company logo"
        />
        <h1 className="text-3xl font-medium mt-5">Email Signature Generator</h1>
      </header>
      {/* Form section */}
      <section className="mt-15">
        <h2 className="text-xl">
          Please provide the following information to generate your email
          signature.
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block" htmlFor="code">
            Code
          </label>
          <input
            className="border border-gray-400 rounded-md"
            id="code"
            type="text"
            name="overview_subscriber_code"
            value={formData.overview_subscriber_code}
            onChange={handleChange}
          />
          <label className="block" htmlFor="id">
            ID
          </label>
          <input
            className="border border-gray-400 rounded-md"
            id="id"
            type="text"
            name="overview_subscriber_id"
            value={formData.overview_subscriber_id}
            onChange={handleChange}
          />
          <label className="block" htmlFor="email">
            Company Email
          </label>
          <input
            className="border border-gray-400 rounded-md"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <button className="block border border-gray-400" type="submit">
            {isFetching ? "Please wait..." : "Generate"}
          </button>
        </form>
      </section>
      {/* <FormEmailSignature setEmployee={setEmployee} /> */}
      {/* Generated section */}
      {data?.count && (
        <section className="mt-20 p-5 bg-[#f3f5f6] rounded-2xl">
          {/* Signature left info */}
          <div>
            <img
              className="rounded-full size-24"
              src="https://myfbsapp.com/v2/img/MC.png"
              alt="employee headshot"
            />
            <span>[Name]{data?.count}</span>
            <br />
            <span>[Job Title]</span>
            <img
              className="w-[80px] h-[20px]"
              src={`https://myfbsapp.com/v2/img/fbs-logo-FBS001.png`}
              alt="fbs company logo"
            />
          </div>
          {/* Signature right info */}
          <div>
            <img src="#" alt="email icon" />
            <span>[Email]</span>
            <img src="#" alt="web icon" />
            <span>[Website url]</span>
            <img src="#" alt="moible icon" />
            <span>[Mobile number]</span>
            <img src="#" alt="landline icon" />
            <span>[Landline number]</span>
          </div>
          {/* Confidentiality Notice */}
          <div>
            <p>
              <span className="text-blue-400">CONFIDENTIALITY NOTICE: </span>The
              contents of this email message and any attachments are intended
              solely for the addressee(s) and may contain confidential and/or
              privileged information and may be legally protected from
              disclosure. If you are not the intended recipient of this message
              or their agent, or if this message has been addressed to you in
              error, please immediately alert the sender by reply email and then
              delete this message and any attachments. If you are not the
              intended recipient, you are hereby notified that any use,
              dissemination, copying, or storage of this message or its
              attachments is strictly prohibited.
            </p>
          </div>
          {/* Action to copy */}
          <div className="mt-5">
            <button className="border border-gray-400">Copy</button>
          </div>
        </section>
      )}
      {isError && (
        <div className="mt-10 p-5 bg-[#f3f5f6] rounded-2xl text-red-700">
          Error loading data: {error.message}
        </div>
      )}
    </div>
  );
}
