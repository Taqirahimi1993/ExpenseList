import React, { FormEvent, HtmlHTMLAttributes, useRef, useState } from "react";
import {
  FieldValue,
  FieldValues,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3),
  age: z.number().min(18),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            {...register("name")}
            className="form-control"
            id="name"
          />
          {errors.name && <p className="text-danger"> {errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="age">
            Age:
          </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="form-control"
            id="age"
          />
          {errors.age && <p className="text-danger"> {errors.age.message}</p>}
        </div>
        <button className="btn btn-secondary" type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
