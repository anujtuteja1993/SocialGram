import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";
const Home = () => {
    return (
        <div className="flex flex-col mt-20 gap-5 items-center">
            <div className="flex gap-1 items-center">
                <HomeSolid className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                <h1 className="text-2xl font-semibold md:text-3xl">Home</h1>
            </div>
            <div className="container w-screen border-[1px] rounded-xl border-primary-content md:max-w-xl">
                <div className="flex flex-col m-10">
                    <div className="flex flex-row mb-3">
                        <div className="avatar flex justify-center items-center">
                            <div className="w-10 rounded-full cursor-pointer md:w-12">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center ml-2">
                                <h1 className="font-bold text-primary mx-1 text-sm md:text-lg">
                                    TestName
                                </h1>
                                <span className="mx-1 font-light text-secondary-content text-sm">
                                    &#8226;
                                </span>
                                <p className="mx-1 font-light text-secondary-content text-sm">
                                    8hr
                                </p>
                            </div>
                            <div className="ml-2 items-center">
                                <span className="mx-1 font-light text-secondary-content text-sm">
                                    Tokyo
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-primary font-normal mb-1">
                            Some random caption that goes on and on
                        </p>
                    </div>
                    <div className="mb-3 text-secondary-content font-light">
                        <p>#tags #anothertag #onemoretag</p>
                    </div>
                    {/* <div className="aspect-square rounded-lg w-fill">
                        <img src={Img} className="object-cover" alt="Image" />
                    </div> */}
                    <div className="w-full carousel aspect-[4/5] rounded-box">
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between m-1">
                        <HeartIcon className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                        <BookmarkIcon className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                    </div>
                </div>
            </div>
            <div className="container w-screen border-[1px] rounded-xl border-primary-content md:max-w-xl">
                <div className="flex flex-col m-10">
                    <div className="flex flex-row mb-3">
                        <div className="avatar flex justify-center items-center">
                            <div className="w-10 rounded-full cursor-pointer md:w-12">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center ml-2">
                                <h1 className="font-bold text-primary mx-1 text-sm md:text-lg">
                                    TestName
                                </h1>
                                <span className="mx-1 font-light text-secondary-content text-sm">
                                    &#8226;
                                </span>
                                <p className="mx-1 font-light text-secondary-content text-sm">
                                    8hr
                                </p>
                            </div>
                            <div className="ml-2 items-center">
                                <span className="mx-1 font-light text-secondary-content text-sm">
                                    Tokyo
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-secondary-content font-normal mb-1">
                            Some random caption that goes on and on
                        </p>
                    </div>
                    <div className="mb-3">
                        <p>#tags #anothertag #onemoretag</p>
                    </div>
                    {/* <div className="aspect-square rounded-lg w-fill">
                        <img src={Img} className="object-cover" alt="Image" />
                    </div> */}
                    <div className="w-full carousel rounded-box">
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                                className="w-full"
                                alt="Tailwind CSS Carousel component"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between m-1">
                        <HeartIcon className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                        <BookmarkIcon className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
