interface EmployeeProps {
  name: string;
  jobTitle: string;
  email: string;
  photo: string;
}

export function GeneratedEmailSignature({
  name,
  jobTitle,
  email,
  photo,
}: EmployeeProps) {
  const imgUrl = import.meta.env.VITE_APP_BASE_IMG_URL as string;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "11px",
        color: "#333333",
        maxWidth: "800px",
      }}
    >
      {/* <!-- Main Contact Block --> */}
      <table
        // style="signature-table"
        style={{
          borderCollapse: "collapse",
          backgroundColor: "#f4f5f7",
          borderRadius: "8px",
        }}
      >
        <tr>
          {/* <!-- Photo --> */}
          <td
            // style="profile-cell"
            style={{
              verticalAlign: "middle",
              paddingLeft: "15px",
              paddingRight: "0px !important",
            }}
          >
            <img
              src={`${imgUrl}/${photo}`}
              alt="Patrick Reyes"
              // style="avatar"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </td>

          {/* <!-- Name and Brand --> */}
          <td
            style={{
              verticalAlign: "middle",
              padding: "20px",
              paddingRight: "23px",
            }}
          >
            <div
              // style="name"
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                margin: "0 0 2px 0",
                color: "#111111",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
            <div
              // style="title"
              style={{
                fontSize: "11px",
                margin: "0 0 8px 0",
                color: "#666666",
              }}
            >
              {jobTitle}
            </div>
            {/* <!-- Replace src with your actual logo image path --> */}
            <img
              src="https://my.frontlinebusiness.com.ph/v2/img/fbs-logo-FBS001.png"
              alt="FRONTLINE business solutions"
              // style="logo"
              style={{
                maxHeight: "22px",
                maxWidth: "88px",
                display: "block",
              }}
            />
          </td>

          {/* <!-- Contact Methods --> */}
          <td
            // style="contact-cell"
            style={{
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                borderLeft: "2.5px solid #801020",
              }}
            >
              <div
                // style="contact-item"
                style={{
                  marginBottom: "4px",
                  whiteSpace: "nowrap",
                  marginTop: "20px",
                }}
              >
                <span
                  // style="icon"
                  style={{
                    display: "inline-block",
                    width: "14px",
                    textAlign: "center",
                    marginRight: "6px",
                    color: "#801020",
                    fontWeight: "bold",
                  }}
                >
                  {/* &#9993; */}
                  &#128231;
                </span>
                <a
                  href={`mailto:${email}`}
                  // style="contact-link"
                  style={{
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  {email}
                </a>
              </div>
              <div
                style={{
                  marginBottom: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "14px",
                    textAlign: "center",
                    marginRight: "6px",
                    color: "#801020",
                    fontWeight: "bold",
                  }}
                >
                  {/* &#127760; */}
                  &#127758;
                </span>
                <a
                  href="https://frontlinebusiness.com.ph"
                  target="_blank"
                  // style="contact-link"
                  style={{
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  frontlinebusiness.com.ph
                </a>
              </div>
              <div
                style={{
                  marginBottom: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  // style="icon"
                  style={{
                    display: "inline-block",
                    width: "14px",
                    textAlign: "center",
                    marginRight: "6px",
                    color: "#801020",
                    fontWeight: "bold",
                  }}
                >
                  {/* &#128222; */}
                  &#128241;
                </span>
                <a
                  href="tel:+639271686810"
                  // style="contact-link"
                  style={{
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  (+63) 927 168 6810
                </a>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  // style="icon"
                  style={{
                    display: "inline-block",
                    width: "14px",
                    textAlign: "center",
                    marginRight: "6px",
                    color: "#801020",
                    fontWeight: "bold",
                  }}
                >
                  {/* &#128222; */}
                  &#9742;
                </span>
                <a
                  href="tel:0495302112"
                  // style="contact-link"
                  style={{
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  (049) 530-2112
                </a>
              </div>
            </div>
          </td>
        </tr>
      </table>

      {/* <!-- Disclaimer Block --> */}
      <div
        // style="disclaimer-section"
        style={{
          marginTop: "15px",
          padding: "0 5px",
        }}
      >
        <div
          // style="disclaimer-title"
          style={{
            color: "#4b6b94",
            fontWeight: "bold",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "4px",
          }}
        >
          CONFIDENTIALITY NOTICE:
        </div>
        <div
          // style="disclaimer-text"
          style={{
            color: "#666666",
            fontSize: "9px",
            lineHeight: "1.3",
            textAlign: "justify",
          }}
        >
          The contents of this email message and any attachments are intended
          solely for the addressee(s) and may contain confidential and/or
          privileged information and may be legally protected from disclosure.
          If you are not the intended recipient of this message or their agent,
          or if this message has been addressed to you in error, please
          immediately alert the sender by reply email and then delete this
          message and any attachments. If you are not the intended recipient,
          you are hereby notified that any use, dissemination, copying, or
          storage of this message or its attachments is strictly prohibited.
        </div>
      </div>
    </div>
  );
}
