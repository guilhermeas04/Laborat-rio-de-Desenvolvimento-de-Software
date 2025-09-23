import { Button } from "@/components/ui/button";
import { Car, Shield, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Car3D from "@/components/3d/Car3D";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Car,
      title: "Frota Diversificada",
      description: "Ampla variedade de veículos para atender suas necessidades",
    },
    {
      icon: Shield,
      title: "Processo Seguro",
      description: "Sistema confiável com análise criteriosa de pedidos",
    },
    {
      icon: Clock,
      title: "Aprovação Rápida",
      description: "Análise agilizada para aprovação em até 24 horas",
    },
    {
      icon: CheckCircle,
      title: "Gestão Completa",
      description: "Acompanhe todos os seus pedidos em tempo real",
    },
  ];

  // Cores possíveis do carro
  const carColors = ["#4A9EFF", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF"];
  const carTypes = ["sedan", "suv", "hatchback", "sports"];
  const [carColor, setCarColor] = useState(carColors[0]);
  const [carType, setCarType] = useState(carTypes[0]);

  useEffect(() => {
    // Sorteia cor e tipo do carro ao carregar a página
    const randomColor = carColors[Math.floor(Math.random() * carColors.length)];
    const randomType = carTypes[Math.floor(Math.random() * carTypes.length)];
    setCarColor(randomColor);
    setCarType(randomType);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Car3D color={carColor} carType={carType} className="w-48 h-48 mx-auto animate-fade-in" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Car<span style={{ color: carColor }}>On</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sistema completo de aluguel de carros com gestão inteligente de pedidos,
              análise de crédito e controle de frota.
            </p>
            <div className="space-x-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="text-lg px-8 py-3"
                style={{ backgroundColor: carColor, borderColor: carColor, color: "#fff", transition: "none" }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = carColor; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = carColor; }}
              >
                Fazer Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/cadastro")}
                className="text-lg px-8 py-3"
                style={{ color: carColor, borderColor: carColor, transition: "none" }}
                onMouseOver={e => { e.currentTarget.style.color = carColor; e.currentTarget.style.borderColor = carColor; }}
                onMouseOut={e => { e.currentTarget.style.color = carColor; e.currentTarget.style.borderColor = carColor; }}
              >
                Cadastre-se
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
