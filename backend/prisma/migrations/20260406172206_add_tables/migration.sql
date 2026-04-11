-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "internal_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" SERIAL NOT NULL,
    "internal_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expected_value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" SERIAL NOT NULL,
    "internal_key" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity_type_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentRun" (
    "id" SERIAL NOT NULL,
    "internal_key" TEXT NOT NULL,
    "user_input" TEXT NOT NULL,
    "final_output" TEXT,
    "status" TEXT NOT NULL DEFAULT 'running',
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentStep" (
    "id" SERIAL NOT NULL,
    "internal_key" TEXT NOT NULL,
    "agent_run_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "action_type" TEXT NOT NULL,
    "tool_name" TEXT,
    "tool_input" JSONB,
    "tool_output" JSONB,
    "llm_response" TEXT,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolLog" (
    "id" SERIAL NOT NULL,
    "internal_key" TEXT NOT NULL,
    "tool_name" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "execution_time_ms" INTEGER,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_internal_key_key" ON "User"("internal_key");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType_internal_key_key" ON "ActivityType"("internal_key");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityLog_internal_key_key" ON "ActivityLog"("internal_key");

-- CreateIndex
CREATE INDEX "ActivityLog_user_id_idx" ON "ActivityLog"("user_id");

-- CreateIndex
CREATE INDEX "ActivityLog_activity_type_id_idx" ON "ActivityLog"("activity_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "AgentRun_internal_key_key" ON "AgentRun"("internal_key");

-- CreateIndex
CREATE UNIQUE INDEX "AgentStep_internal_key_key" ON "AgentStep"("internal_key");

-- CreateIndex
CREATE INDEX "AgentStep_agent_run_id_idx" ON "AgentStep"("agent_run_id");

-- CreateIndex
CREATE UNIQUE INDEX "ToolLog_internal_key_key" ON "ToolLog"("internal_key");

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentStep" ADD CONSTRAINT "AgentStep_agent_run_id_fkey" FOREIGN KEY ("agent_run_id") REFERENCES "AgentRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
