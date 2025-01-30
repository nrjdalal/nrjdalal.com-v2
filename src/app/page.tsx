export default function Page() {
  return (
    <main className="min-h-dvh bg-black text-slate-50">
      <div className="flex h-14 w-full justify-between border-b border-gray-700">
        <div className="flex h-full min-w-64 cursor-pointer items-center gap-x-2 border-r border-gray-700 px-5 hover:bg-white/5">
          <svg
            className="size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.7134 10.1281L17.4668 10.6938C17.2864 11.1079 16.7136 11.1079 16.5331 10.6938L16.2866 10.1281C15.8471 9.11947 15.0555 8.31641 14.0677 7.87708L13.308 7.53922C12.8973 7.35653 12.8973 6.75881 13.308 6.57612L14.0252 6.25714C15.0384 5.80651 15.8442 4.97373 16.2761 3.93083L16.5293 3.31953C16.7058 2.89349 17.2942 2.89349 17.4706 3.31953L17.7238 3.93083C18.1558 4.97373 18.9616 5.80651 19.9748 6.25714L20.6919 6.57612C21.1027 6.75881 21.1027 7.35653 20.6919 7.53922L19.9323 7.87708C18.9445 8.31641 18.1529 9.11947 17.7134 10.1281ZM2.82843 12.0001L7.07107 16.2428L5.65685 17.657L0 12.0001L5.65685 6.34326L7.07107 7.75748L2.82843 12.0001ZM18.3429 17.6572L23.9998 12.0003L21.1714 9.17188L19.7571 10.5861L21.1714 12.0003L16.9287 16.2429L18.3429 17.6572Z"></path>
          </svg>
          <p className="font-mono">NRJDALAL.COM</p>
        </div>
        <div className="flex cursor-pointer items-center font-medium text-gray-400">
          <div className="flex h-full items-center border-gray-700 px-7.5 hover:border-b-2 hover:border-b-white hover:pt-[2px] hover:text-white">
            home
          </div>
          <div className="flex h-full items-center border-l border-gray-700 px-7.5 hover:border-b-2 hover:border-b-white hover:pt-[2px] hover:text-white">
            blogs
          </div>
          <div className="flex h-full items-center border-l border-gray-700 px-7.5 hover:border-b-2 hover:border-b-white hover:pt-[2px] hover:text-white">
            projects
          </div>
          <div className="flex h-full items-center border-l border-gray-700 px-7.5 hover:border-b-2 hover:border-b-white hover:pt-[2px] hover:text-white">
            contact
          </div>
          <div className="flex aspect-square h-full items-center justify-center border-l border-gray-700 hover:bg-white/10 hover:text-white">
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="h-96"></div>

      <div className="mx-auto max-w-screen-xl p-5">
        <div className="grid border-[0.5px] border-gray-700 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 border-[0.5px] border-gray-700"
            ></div>
          ))}
        </div>
      </div>
    </main>
  )
}
