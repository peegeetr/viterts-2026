import React from "react";
import type { EmailSignature } from "./emailSignatureTypes";

export default function EmailSignatureGenerator() {
  const [employee, setEmployee] = React.useState<EmailSignature[]>([]);

  const generateEmailSignature = (): void => {
    const eSignature: EmailSignature = {
      name: "",
      jobTitle: "",
      photo: "",
      email: "",
      webUrl: "",
      mobile: "",
      landLine: "",
    };
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
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
          <label className="block" htmlFor="name">
            Employee Name
          </label>
          <input
            className="border border-gray-400 rounded-md"
            id="name"
            type="text"
          />
          <label className="block" htmlFor="email">
            Company Email
          </label>
          <input
            className="border border-gray-400 rounded-md"
            id="email"
            type="email"
          />
          <button className="block border border-gray-400" type="submit">
            Generate
          </button>
        </form>
      </section>

      {/* Generated section */}
      <section className="mt-20 p-5 bg-[#f3f5f6] rounded-3xl">
        {/* Signature left info */}
        <div>
          <img
            className="rounded-full size-24"
            src="https://myfbsapp.com/v2/img/MC.png"
            alt="employee headshot"
          />
          <span>[Name]</span>
          <br />
          <span>[Job Title]</span>
          <img
            className="w-[80px] h-[20px]"
            src="https://myfbsapp.com/v2/img/fbs-logo-FBS001.png"
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
            privileged information and may be legally protected from disclosure.
            If you are not the intended recipient of this message or their
            agent, or if this message has been addressed to you in error, please
            immediately alert the sender by reply email and then delete this
            message and any attachments. If you are not the intended recipient,
            you are hereby notified that any use, dissemination, copying, or
            storage of this message or its attachments is strictly prohibited.
          </p>
        </div>
        {/* Action to copy */}
        <div className="mt-5">
          <button className="border border-gray-400">Copy</button>
        </div>
      </section>
    </div>
  );
}
