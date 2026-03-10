import React, { use, useState } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddSch = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const scholarshipData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      universityImage: form.universityImage.value,
      universityCountry: form.country.value,
      universityCity: form.city.value,
      universityWorldRank: Number(form.worldRank.value),
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: form.tuitionFees.value
        ? Number(form.tuitionFees.value)
        : null,
      applicationFees: Number(form.applicationFees.value),
      serviceCharge: Number(form.serviceCharge.value),
      applicationDeadline: form.deadline.value,
      scholarshipPostDate: form.postDate.value,
      postedUserEmail: user?.email,
    };

    console.log(user);

    setLoading(false);
    // form.reset();

    fetch("https://scholar-stream-server-gules.vercel.app/all-scholarships", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(scholarshipData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        toast.success("Scholarship added successfully");
        navigate("/all-scholarships");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Scholarship</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Scholarship Name */}
        <div>
          <label className="label">Scholarship Name</label>
          <input
            name="scholarshipName"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* University Name */}
        <div>
          <label className="label">University Name</label>
          <input
            name="universityName"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* University Image */}
        <div>
          <label className="label">University Image URL</label>
          <input
            name="universityImage"
            type="url"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="label">Country</label>
          <input
            name="country"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="label">City</label>
          <input
            name="city"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* World Rank */}
        <div>
          <label className="label">University World Rank</label>
          <input
            name="worldRank"
            type="number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Subject Category */}
        <div>
          <label className="label">Subject Category</label>
          <select
            name="subjectCategory"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select</option>
            <option>Science</option>
            <option>Engineering</option>
            <option>Business</option>
            <option>Arts</option>
            <option>Medical</option>
          </select>
        </div>

        {/* Scholarship Category */}
        <div>
          <label className="label">Scholarship Category</label>
          <select
            name="scholarshipCategory"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select</option>
            <option>Full Fund</option>
            <option>Partial</option>
            <option>Self Fund</option>
          </select>
        </div>

        {/* Degree */}
        <div>
          <label className="label">Degree</label>
          <select
            name="degree"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
        </div>

        {/* Tuition Fees */}
        <div>
          <label className="label">Tuition Fees (Optional)</label>
          <input
            name="tuitionFees"
            type="number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Application Fees */}
        <div>
          <label className="label">Application Fees</label>
          <input
            name="applicationFees"
            type="number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Service Charge */}
        <div>
          <label className="label">Service Charge</label>
          <input
            name="serviceCharge"
            type="number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Application Deadline</label>
          <input
            name="deadline"
            type="date"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Post Date */}
        <div>
          <label className="label">Post Date</label>
          <input
            name="postDate"
            type="date"
            value={today}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* User Email */}
        <div className="md:col-span-2">
          <label className="label">Posted User Email</label>
          <input
            name="userEmail"
            type="email"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Scholarship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSch;
