import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const cows = [
    {
        animalNr: 4575,
        group: 52,
        DIM: "",
        lactationNr: "",
        daysSinceLastBreeding: 218,
        reproductionStatus: "Do not breed since 4/1/2020",
        timeLatestAlert: "4/1/2020 5:00:00 PM",
        inHeatState: "3.1h",
        healthState: "No movement 1h",
        ruminationMinutes: 399,
        eatingMinutes: 83,
    },
    {
        animalNr: 4207,
        group: 56,
        DIM: "",
        lactationNr: "",
        daysSinceLastBreeding: "",
        reproductionStatus: "No communication since 3/31/2020 9:44:41 AM",
        timeLatestAlert: "",
        inHeatState: "",
        healthState: "Very sick 1h",
        ruminationMinutes: 349,
        eatingMinutes: 55,
    },
];

export default function CowManager() {
    const [selectedGroup, setSelectedGroup] = useState("All");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4 text-red-700">
                    CowManager
                </h2>
                <nav className="space-y-2">
                    <button className="w-full text-left py-2 px-4 bg-white rounded-md hover:bg-gray-200">
                        Input
                    </button>
                    <button className="w-full text-left py-2 px-4 bg-white rounded-md hover:bg-gray-200">
                        Nutrition
                    </button>
                    <button className="w-full text-left py-2 px-4 bg-white rounded-md hover:bg-gray-200">
                        Reports
                    </button>
                    <button className="w-full text-left py-2 px-4 bg-white rounded-md hover:bg-gray-200">
                        Settings
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-white">
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">Fertility Insights</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Find my Cow"
                            className="border rounded-md pl-10 pr-4 py-2 w-64"
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={16}
                        />
                    </div>
                </header>

                {/* Filter and groups */}
                <div className="flex space-x-2 mb-4">
                    <button className="bg-orange-500 text-white py-1 px-4 rounded-md">
                        Filter
                    </button>
                    <button className="bg-gray-200 py-1 px-4 rounded-md">
                        Save Filter
                    </button>
                    <button className="bg-gray-200 py-1 px-4 rounded-md">
                        Reset Filter
                    </button>
                    <button className="bg-red-500 text-white py-1 px-4 rounded-md">
                        Fertility Insights
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                    Animal Nr
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Group
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    DIM
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Lactation Nr
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Days Since Last Breeding
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Reproduction Status
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Time Latest Alert
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    In Heat State
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Health State
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Rumination Minutes
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Eating Minutes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cows.map((cow, index) => (
                                <tr
                                    key={index}
                                    className={
                                        cow.healthState.includes("Very sick")
                                            ? "bg-red-100"
                                            : ""
                                    }
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.animalNr}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.group}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.DIM}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.lactationNr}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.daysSinceLastBreeding}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.reproductionStatus}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.timeLatestAlert}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.inHeatState}
                                    </td>
                                    <td
                                        className={`border border-gray-300 px-4 py-2 ${
                                            cow.healthState.includes(
                                                "Very sick"
                                            )
                                                ? "text-red-700 font-bold"
                                                : ""
                                        }`}
                                    >
                                        {cow.healthState}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.ruminationMinutes}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {cow.eatingMinutes}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
