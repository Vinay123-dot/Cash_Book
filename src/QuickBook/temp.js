<div style={{ padding: 20 }}>
          <h1>Form Example</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="name">Name</label>
                  <Field name="name" as={Input} placeholder="Enter your name" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="email">Email</label>
                  <Field name="email" as={Input} placeholder="Enter your email" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label>Gender</label>
                  <Field name="gender">
                    {({ field }) => (
                      <Radio.Group {...field}>
                        {genderOptions.map(option => (
                          <Radio key={option.value} value={option.value}>
                            {option.label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                  </Field>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="country">Country</label>
                  <Field name="country" as={Select} placeholder="Select a country">
                    <Option value="usa">USA</Option>
                    <Option value="uk">UK</Option>
                    <Option value="canada">Canada</Option>
                  </Field>
                </div>
                <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>