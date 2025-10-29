async function getRoadmapItems() {
  try {
    const res = await fetch(
      "https://api.jedwal.co/api/117187395759203962885/energetic-flank?worksheet=Roadmap"
    );
    return res.json();
  } catch {
    throw new Error("Could not fetch roadmap items");
  }
}

export const RoadmapTimeline = async () => {
  const data = await getRoadmapItems();
  const completedItems = data.filter((item: any) => item.completion_date);
  const upcomingItems = data.filter((item: any) => !item.completion_date);

  return (
    <>
      {/* Completed items with solid line */}
      {completedItems.length > 0 && (
        // Adding pb-px helps connect the completed border line with the dotted line. Not sure why
        <ol className="relative border-s-2 border-[#005430] dark:border-gray-700 pb-px">
          {completedItems.map((roadmapItem: any, index: number) => {
            return (
              <div key={`completed-${index}`}>
                <li className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-[#005430] rounded-full mt-1.5 -start-1.5 border border-[#005430]"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {new Date(
                      roadmapItem.completion_date as string
                    ).toDateString()}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {roadmapItem.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {roadmapItem.description}
                  </p>
                  {roadmapItem.link_title && roadmapItem.link_url && (
                    <a
                      href={`${roadmapItem.link_url}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"
                    >
                      {roadmapItem.link_title}
                      <svg
                        className="w-3 h-3 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  )}
                </li>
              </div>
            );
          })}
        </ol>
      )}

      {/* Upcoming items with dotted line */}
      {upcomingItems.length > 0 && (
        <ol className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-dotted-line"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #005430 50%, transparent 50%)",
              backgroundSize: "2px 10px",
              backgroundRepeat: "repeat-y",
            }}
          ></div>

          {upcomingItems.map((roadmapItem: any, index: number) => (
            <div key={`upcoming-${index}`}>
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-[#005430] z-10"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Coming soon...
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {roadmapItem.title}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {roadmapItem.description}
                </p>
                {roadmapItem.link_title && roadmapItem.link_url && (
                  <a
                    href={`${roadmapItem.link_url}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"
                  >
                    {roadmapItem.link_title}
                    <svg
                      className="w-3 h-3 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                )}
              </li>
            </div>
          ))}
        </ol>
      )}
    </>
  );
};
