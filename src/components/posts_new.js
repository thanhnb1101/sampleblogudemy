import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
  renderField(field) {
    return (
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input} // ~ onChange={field.input.onChange}
          //  onFocus={field.input.onFocus}
          //  onBlur={field.input.onBlur}
        />
        {field.meta.touched ? field.meta.error : ""}
      </div>
    );
  }

  onSubmit(values) {
    // console.log(values);
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  //validate the input from values
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that í at least 3 characters!";
  }

  if (!values.categories) {
    errors.categories = "Enter a categories!";
  }

  if (!values.content) {
    errors.content = "Enter a content!";
  }

  //if errors is empty, the form is fine to submit

  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
