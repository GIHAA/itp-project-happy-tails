import React, { useEffect, useState } from "react";
import adpotServices from "../../services/api/adoptPet";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

function Adoptpet() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    adpotServices.getAll().then((res) => {
      setData(res.profiles);
      setIsLoading(false);
    });
  }, []);

  const handleAdopt = (card) => {
    card = {
      ...card,
      petStatus: "Adopted",
      token: user.token,
      owenerId: user._id,
    };
    const res = adpotServices.updateOne(card).then((res) => {
      toast.success("Adopted successfully");
    });

    console.log(res);
  };

  const handleSearch = (e) => {
    setSearchTerm(document.getElementById("search").value);
  };

  const filteredData = data.filter(
    (card) =>
      card.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.species.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="h-full overflow-y-scrollf bg-bgsec">
        <div className="flex justify-center pt-5">
          <input
            id="search"
            type="text"
            placeholder="   Search for pets... ex: dog, cat, pet name etc"
            className="border-b-[1px] w-[400px] h-[40px] font-bold-sm text-text focus:outline-none focus:ring-2 focus:ring-secondary rounded-[50px]"
          />

          <button
            onClick={handleSearch}
            className="ml-5 bg-primary w-[90px] rounded-[40px] text-[16px] font-bold text-white"
          >
            Search
          </button>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {filteredData.map((card, index) =>
              card.petStatus === "Available" ? (
                <div className="grid grid-cols-1 gap-[70px] px-[80px] py-[40px] h-[200px]p-[50px] rounded-[20px]">
                  <div className="grid grid-cols-3 gap-[20px] px-[120px] h-[300px] ">
                    <div className="bg-cover bg-center rounded-[20px] flex justify-center">
                      <img
                        src={card.image}
                        className="w-auto h-auto rounded-[20px]"
                      />
                    </div>

                    <div className="col-span-2 rounded-[20px] bg-bg p-4">
                      <h1 className="font-bold text-secondary text-[30px] ">
                        {card.petName}
                      </h1>
                      <h1 className="font-bold text-secondary text-[20px]">
                        Pet ID : {card.petId}
                      </h1>
                      <p className="text-text">{card.des}</p>
                      <ul class="list-disc list-inside text-text">
                        <li>species : {card.species}</li>
                        <li>Breed : {card.breed}</li>
                        <li>Gender : {card.gender}</li>
                        <li>Age : {card.age}</li>
                        <li>Color : {card.color}</li>
                        <li>status : {card.petStatus}</li>
                      </ul>
                      <div className="flex justify-end pt-3">
                        <button
                          onClick={() => handleAdopt(card)}
                          className="rounded-[20px] w-[100px] h-[40px] border-[1px] bg-secondary text-white font-bold-sm "
                        >
                          Adopt
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Adoptpet;
