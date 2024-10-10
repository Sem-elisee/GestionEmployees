import React from "react";
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }: any) => {
  const criteria = [
    { label: "Au moins 6 caractères", met: password.length >= 6 },
    { label: "Doit contenir une majuscule", met: /[A-Z]/.test(password) },
    { label: "Doit contenir une minuscule", met: /[a-z]/.test(password) },
    { label: "Doit contenir un chiffre", met: /\d/.test(password) },
    {
      label: "Doit contenir un caractère spécial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
const PasswordStrenth = ({ password }: { password: string }) => {
  const getStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength: number) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return "Très faible";
    if (strength === 1) return "Faible";
    if (strength === 2) return "Passable";
    if (strength === 3) return "Bon";
    return "Fort";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Force du mot de passe</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                  ${index < strength ? getColor(strength) : "bg-gray-600"}
                `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrenth;
