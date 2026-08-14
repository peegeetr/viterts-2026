import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmailSignature } from "./emailSignatureTypes";

// // define post payload
// interface CreatePostData {
//   overview_subscriber_code: string;
//   overview_subscriber_id: string;
//   email: string;
// }

// // define post response
// interface PostResponse {
//   id: number;
//   lastname: string;
//   firstname: string;
//   email: string;
// }

// interface Props {
//   setEmployee: React.Dispatch<React.SetStateAction<string>>;
// }

// // typed api function
// const createPost = async (newPost: CreatePostData): Promise<PostResponse> => {
//   const apiUrl = import.meta.env.VITE_APP_API_URL;
//   const apiVersion = import.meta.env.VITE_APP_API_VERSION;
//   const response = await fetch(
//     `${apiUrl}/${apiVersion}/client-overview/read-all-active-announcement`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Basic " + btoa(`${import.meta.env.VITE_APP_API_KEY}:''`),
//       },
//       body: JSON.stringify(newPost),
//     },
//   );

//   if (!response.ok) {
//     throw new Error("Failed to create post. Please try again.");
//   }

//   return response.json();
// };

// export function FormEmailSignature({ setEmployee }: Props) {
//   const queryClient = useQueryClient();

//   // Generics structure: <TData, TError, TVariables, TContext>
//   const mutation = useMutation<PostResponse, Error, CreatePostData>({
//     mutationFn: createPost,

//     // Type-safe callbacks
//     onSuccess: (data: PostResponse) => {
//       console.log("Post created:", data);
//       setEmployee([{ id: data, lastname: data, firstname: data, email: data }]);

//       // Invalidate your fetching query cache to trigger a background refetch
//       queryClient.invalidateQueries({ queryKey: ["eSign"] });
//     },
//     onError: (error: Error) => {
//       console.error("Mutation failed:", error.message);
//     },
//   });

  //   console.log(mutation);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // // Type checking ensures you pass exactly the CreatePostInput shape
    // mutation.mutate(
    //   {
    //     overview_subscriber_code: "FBS001",
    //     overview_subscriber_id: "1",
    //     email: "patrick.reyes@frontlinebusiness.com.ph",
    //   },
    //   //   {
    //   //     // Component-level callbacks (great for UI resets)
    //   //     onSuccess: () => {
    //   //       setTitle('')
    //   //       setBody('')
    //   //     },
    //   //   }
    // );
  };
  return (
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
  );
}
