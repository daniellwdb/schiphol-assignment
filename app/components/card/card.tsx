import { ReactNode } from "react";
import "./card.css";

type CardProps = {
  children: ReactNode;
  title: string;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="card-container">
      <h2 className="card-title">{title}</h2>
      {children}
    </div>
  );
}
