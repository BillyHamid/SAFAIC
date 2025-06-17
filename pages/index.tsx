"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Mail, Phone, User, MapPin, Globe,
  Languages, Briefcase, BadgePlus
} from "lucide-react";

export default function SignupFormSAFAIC() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      genre: formData.get("genre"),
      titre: formData.get("titre"),
      specialite: formData.get("specialite"),
      nationalite: formData.get("nationalite"),
      residence: formData.get("residence"),
      langues: formData.get("langues"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp")
    };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxkW-oZFamHX3ZNgSZzFoxUUklGqjmwcOgtVqYZafVkTZBK0MPfcz71CeE4lhlXBouD5Q/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setShowSuccess(true); // Affiche le toast
        form.reset();

        // Cache automatiquement le message après 5 secondes
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      console.error("Erreur : ", error);
      alert("Erreur réseau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 shadow-xl rounded-3xl p-8 border border-gray-200 dark:border-zinc-700">
        <h2 className="text-2xl font-bold text-center text-blue-800 dark:text-white mb-2">
          Adhésion à la SAFAIC
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-300 mb-6">
          Merci de remplir ce formulaire pour rejoindre gratuitement le village des sociétés savantes.
        </p>

        {/* ✅ Toast de succès */}
        {showSuccess && (
          <div className="mb-4 rounded-md bg-green-100 px-4 py-3 text-green-800 shadow transition duration-300 ease-in-out">
            ✅ Votre inscription a bien été envoyée !
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInputWithIcon label="Nom" icon={<User className="h-4 w-4" />} id="nom" placeholder="Ouattara" />
            <LabelInputWithIcon label="Prénom" icon={<User className="h-4 w-4" />} id="prenom" placeholder="Billy" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                Genre <BadgePlus className="h-4 w-4" />
              </label>
              <select
                id="genre"
                name="genre"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>Sélectionnez un genre</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <LabelInputWithIcon
              label="Titre"
              icon={<Briefcase className="h-4 w-4" />}
              id="titre"
              placeholder="Dr, Pr, M."
            />
          </div>

          <LabelInputWithIcon label="Spécialité" icon={<Briefcase className="h-4 w-4" />} id="specialite" placeholder="Médecine interne, Chirurgie..." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInputWithIcon label="Nationalité" icon={<Globe className="h-4 w-4" />} id="nationalite" placeholder="Burkinabè, Ivoirien(ne)..." />
            <LabelInputWithIcon label="Résidence" icon={<MapPin className="h-4 w-4" />} id="residence" placeholder="Ouagadougou, Burkina Faso" />
          </div>

          <LabelInputWithIcon label="Langues parlées" icon={<Languages className="h-4 w-4" />} id="langues" placeholder="Français, Anglais, Mooré..." />
          <LabelInputWithIcon label="Adresse Email" icon={<Mail className="h-4 w-4" />} id="email" type="email" placeholder="exemple@safaic.org" />
          <LabelInputWithIcon label="Téléphone WhatsApp" icon={<Phone className="h-4 w-4" />} id="whatsapp" type="tel" placeholder="+226 70 00 00 00" />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg">
            Soumettre l’adhésion →
          </button>
        </form>
      </div>
    </div>
  );
}

// Composant réutilisable
const LabelInputWithIcon = ({
  label,
  id,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <Input
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          className="pl-10 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-zinc-800 dark:text-white"
          required
        />
      </div>
    </div>
  );
};
