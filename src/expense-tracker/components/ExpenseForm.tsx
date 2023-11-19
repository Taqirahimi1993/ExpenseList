import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const formSchema = z.object({
  description: z
    .string()
    .min(3, "Description should be at lest 3 characters")
    .max(100),
  amount: z
    .number({ invalid_type_error: "the Number is Required" })
    .min(1)
    .max(1000_00),
  category: z.enum(categories, {
    errorMap: () => ({ message: " the category is Required" }),
  }),
});
type ExpenseFormData = z.infer<typeof formSchema>;
interface Props {
  onSubmitForms: (data: ExpenseFormData) => void;
}
const ExpenseForm = ({ onSubmitForms }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitForms(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          {...register("description")}
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
