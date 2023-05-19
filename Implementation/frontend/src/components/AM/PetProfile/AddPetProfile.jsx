import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPetProfile() {
  const [petName, setName] = useState("");
  const [species, setSpec] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGen] = useState("");
  const [birth, setBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [petStatus, setStatus] = useState("");
  const [pId, setId] = useState("");
  const [image, setImage] = useState("");
  const [nameError, setNameError] = useState("");
  const [price, setPrice] = useState("");
  const [allbreeds, setAllBreed] = useState([]);

  useEffect(() => {
    console.log("Pet id called");
    async function fetchCount() {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/counter`);
        setId(response.data.count.toString());
        console.log(response.data.count.toString());
      } catch (err) {
        console.log(err);
      }
    }
    fetchCount();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/petbreed/getbreed`)
      .then((response) => {
        setAllBreed(response.data.allbreed);
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error);
      });
  }, []);

  console.log(breed);

  function addPet(e) {
    e.preventDefault();

    if (nameError) {
      toast.warn(`${nameError}`, {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    if (parseInt(weight) > 100) {
      toast.warn("Please set Valid Weight (<= 100Kg)", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    if (petStatus == "") {
      toast.warn("Please set the Pet Status", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    if (species == "") {
      toast.warn("Please set the Pet Species", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    if (breed == "") {
      toast.warn("Please set the Pet Breed", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    if (gender == "") {
      toast.warn("Please set the Gender", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    if (parseInt(price) < 10000) {
      toast.warn("Please set the Valid Price (>=Rs.5,000)", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    const newPet = {
      petName,
      pId,
      species,
      breed,
      gender,
      birth,
      weight,
      color,
      date,
      petStatus,
      image,
      price,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}api/vet/addpet`, newPet, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        setName("");
        setSpec("");
        setBreed("");
        setGen("");
        setBirth("");
        setWeight("");
        setColor("");
        setDate("");
        setStatus("");
        setId("");
        setImage("");
        setPrice("");
        toast.success("Pet Profile saved successfully", {
          autoClose: 1000, // Display for 3 seconds
        });
        setTimeout(
          () => (window.location.href = `/petprofile/allpetprofile`),
          2000
        );
      })
      .catch((err) => {
        alert(`Failed to add pet: ${err}`);
      });
  }

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function handleNameError(e) {
    const name = e.target.value;
    if (name.length > 15) {
      setNameError("Pet name should not exceed 15 characters.");
    } else {
      setNameError("");
    }
  }

  return (
    <>
      <div class="flex justify-center items-center  h-full w-full bg-white pt-5">
        <div class="w-2/3 bg-[#34495E] rounded-3xl shadow-2xl p-8 m-4 ml-64 mt-24">
          <h1 class="block w-full text-center text-white text-3xl font-bold mb-6">
            Pet Registration
          </h1>

          <form onSubmit={addPet} method="post" class="grid grid-cols-3 gap-1">
            <div class="flex flex-col mb-4 mr-4 pt-8">
              <label
                class="mb-2 font-bold text-lg text-white ml-5"
                for="petName"
              >
                Pet Name
              </label>
              <input
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                onBlur={handleNameError}
                type="text"
                placeholder='Pet Name or "Nil"'
                name="petName"
                id="petName"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div class="flex flex-col mb-4 mr-5 pt-8">
              <label
                class="mb-2 font-bold text-lg text-white ml-5"
                for="petStatus"
              >
                Species
              </label>
              <select
                name="petStatus"
                required
                id="petStatus"
                onChange={(e) => {
                  setSpec(e.target.value);
                }}
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
              >
                <option selected disabled hidden>
                  Choose Species
                </option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
              </select>
            </div>
            <div class="flex flex-col mb-4 mr-5 pt-8">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="breed">
                Breed
              </label>
              <select
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                type="text"
                name="breed"
                id="breed"
                onChange={(e) => {
                  setBreed(e.target.value);
                }}
              >
                <option>Select the Breed</option>
                {allbreeds.map((breed) => (
                  <option key={breed._id} value={breed.breed}>
                    {breed.breed}
                  </option>
                ))}
              </select>
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label
                class="mb-2 font-bold text-lg text-white ml-5"
                for="petStatus"
              >
                Gender
              </label>
              <select
                name="petStatus"
                id="petStatus"
                required
                onChange={(e) => {
                  setGen(e.target.value);
                }}
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
              >
                <option selected>Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="size">
                Weight - ( Kg ){" "}
              </label>
              <input
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                type="number"
                min="0"
                placeholder="Eg: 25.5"
                step="0.01"
                name="size"
                id="size"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="color">
                Colour
              </label>
              <select>
                <option value="black">Black</option>
                <option value="black">Black</option>
                <option value="black">Black</option>
              </select>
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="age">
                Birth Day
              </label>
              <input
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                type="date"
                name="birth"
                id="birth"
                onChange={(e) => {
                  setBirth(e.target.value);
                }}
              />
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="date">
                Date
              </label>
              <input
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                type="date"
                name="date"
                id="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label
                class="mb-2 font-bold text-lg text-white ml-5"
                for="petStatus"
              >
                Status
              </label>

              <select
                name="petStatus"
                id="petStatus"
                required
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                class="border py-3 px-3 text-grey-800 w-full rounded-xl"
              >
                <option selected>Choose Status</option>
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="age">
                Image
              </label>
              <input
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                type="file"
                name="img"
                id="img"
                onChange={convertToBase64}
              />
              {image === "" || image === null ? (
                ""
              ) : (
                <img alt="pet" width={100} height={100} src={image} />
              )}
            </div>

            <div class="flex flex-col mb-4 mr-5">
              <label class="mb-2 font-bold text-lg text-white ml-5" for="price">
                Price
              </label>
              <input
                class="border py-2 px-3 text-grey-800 w-full rounded-xl"
                required
                type="number"
                name="price"
                placeholder="Eg: 25500.00"
                min="0"
                step="0.01"
                id="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div class="-ml-[320px] mt-[120px] w-full">
              <button
                class="block bg-primary hover:bg-amber-700 text-white uppercase font-bold text-sm mx-auto  p-4 rounded-3xl"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPetProfile;
