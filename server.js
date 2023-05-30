const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

fastify.register(cors, {
  // put your options here
});

let OTP_CODE = '123456';

// Declare a route
fastify.get("/sellers_customer_folder_summary", (_request, reply) => {
  reply.code(200).send({
    sellers_customer_folder_summary: {
      cdp_id: "2de75c13-f0c0-46fe-a173-42821dac45f9",
      unit_name: "Fracción 142",
      stage_name: "CLOSED_WON",
      vendor_name: null,
      customer_name: "Name Dummy",
      separation_id: 35821,
      opportunity_id: "0067V000028DDqmQAG",
      payment_plan_id: null,
      separation_date: "2023-04-25T22:42:03.263Z",
      separation_uuid: "12540770-cd37-4873-8ec6-d05297df6deb",
      percentage_loads: 53.8462,
      detail_catalog_code: "01GRCBHN7KRDZHN85YC8K275TW",
      project_catalog_code: "01GR7AN89D7ZN71ZETQC492JYG",
      _airbyte_ab_id: "f17c1c5b-2cf9-4c70-a641-361f99dc689c",
      _airbyte_emitted_at: "2023-05-17T17:17:43.620Z",
      _airbyte_normalized_at: "2023-05-17T17:18:35.804Z",
      _airbyte_sellers_cus__folder_summary_hashid:
        "4dc0aa3e0e5b343d937694ce14ba65a2",
    },
    sales_approval: {
      id: 5,
      project_catalog_id: "01GR7AN89D7ZN71ZETQC492JYG",
      unit_catalog_id: "01GRCBHN7KRDZHN85YC8K275TW",
      opportunity_id: "0067V000028DDqmQAG",
      cdp_id: "2de75c13-f0c0-46fe-a173-42821dac45f9",
      status: "default",
      reason: null,
      user_id: "5c67c56b-462c-49cd-9f6b-68981509af7c",
      created_at: "2023-05-25T16:31:38.002Z",
      updated_at: "2023-05-25T16:31:38.002Z",
      stage: null,
    },
  });
});

fastify.post("/sales_approvals", (request, reply) => {
  const { body } = request;

  if (!body.otp_code) {
    reply.code(401).send({
      errors: ["requireOTPCode"],
      message: "errorValidatingOTP",
    });
  }

  if (body.otp_code !== OTP_CODE) {
    reply.code(401).send({
      errors: ["requireOTPCode", "codeNotValidOrExpired",],
      message: "errorValidatingOTP",
    });
  }

  reply.code(200).send({ message: 'OK!' });
});

fastify.post("/otp_handler", (_request, reply) => {
  OTP_CODE = Math.floor(100000 + Math.random() * 900000).toString();
  reply.code(200).send({ message: 'OK!', code: OTP_CODE });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
