var AssemblaApi = {

	"credentials" : {
		"username" : "",
		"password" : ""
	},

	"defaults" : {
		"url" : "www.assembla.com"
	},

	"services" : {

		"list_of_milestones" : {
			"uri" : "spaces/${space_id}/milestones/",
			"type" : "GET",
			"classname" : "Assembla_Collection_Milestone"
		},


		"show_milestone" : {
			"uri" : "spaces/${space_id}/milestones/${milestone_id}",
			"type" : "GET",
			"classname" : "Assembla_Model_Milestone"
		},

		"create_milestone" : {
			"uri" : "spaces/${space_id}/milestones",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Milestone"

		},

		"update_milestone" : {
			"uri" : "spaces/${space_id}/milestones/${milestone_id}",
			"type" : "PUT",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Milestone"
		},

		"delete_milestone" : {
			"uri" : "spaces/${space_id}/milestones/${milestone_id}",
			"type" : "DELETE"
		},

		"milestone_filter_all" : {
			"uri" : "spaces/milestones/all/${space_id}",
			"type" : "GET",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Collection_Milestone"
		},

		"milestone_filter_completed" : {
			"uri" : "spaces/milestones/completed/${space_id}",
			"type" : "GET",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Collection_Milestone"
		},

		"milestone_filter_release_notes" : {
			"uri" : "spaces/milestones/release_notes/${space_id}",
			"type" : "GET",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Collection_Milestone"
		},

		"milestone_filter_upcoming" : {
			"uri" : "spaces/milestones/upcoming/${space_id}",
			"type" : "GET",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Collection_Milestone"
		},


		"my_spaces_list" : {
			"uri" : "spaces/my_spaces",
			"type" : "GET",
			"classname" : "Assembla_Collection_Space"
		},

		"my_tool_spaces_list" : {
			"uri" :	"spaces/my_tool_spaces/${tool_id}",
			"type" : "GET",
			"classname" : "Assembla_Collection_Space"

		},

		"show_space_by_id" : {
			"uri" : "spaces/${id}",
			"type" : "GET",
			"classname" : "Assembla_Model_Space"
		},

		"show_space_by_wiki_name" : {
			"uri" : "spaces/${wiki_name}",
			"type" : "GET",
			"classname" : "Assembla_Model_Space"
		},

		"update_space_by_id" : {
			"uri" : "spaces/${space_id}",
			"type" : "PUT",
			"headers" : ["Content-Type:application/xml"],
			"classname" : "Assembla_Model_Space"
		},

		"update_space_by_wiki" : {
			"uri" : "spaces/${space_wiki_name}",
			"type" : "PUT",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Space"
		},

		"copy_space" : {
			"uri" : "spaces/${template_space_id}/copy_via_api",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Space"
		},

		"create_space" : {
			"uri" : "spaces/create_via_api",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Space"
		},

		"space_tools" : {
			"uri" : "space/${space_id}/tools",
			"type" : "GET",
			"classname" : "Assembla_Collection_Space_Tool"
		},

		"space_repository_tools" : {
			"uri" : "spaces/${space_id}/tools/repo",
			"type" : "GET",
			"classname" : "Assembla_Collection_Space_Tool"
		},

		"add_space_tool" : {
			"uri" : "spaces/${space_id}/tools?tool_id=${tool_id}",
			"type" : "POST"
		},

		"add_user_to_space" : {
			"uri" : "spaces/${space_id}/add_members",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Space_User"
		},

		"remove_user_from_space" : {
			"uri" : "spaces/${space_id}/remove_members",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Space_User"
		},



		"list_of_tickets" : {
			"uri" : "spaces/${space_id}/tickets/",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket"
		},

		"ticket_report" : {
			"uri" : "spaces/${space_id}/tickets/report/${report_id}",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket"
		},

		"custom_ticket_report" : {
			"uri" : "spaces/${space_id}/tickets/custom_report/${report_id}",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket"
		},

		"show_ticket" :  {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}",
			"type" : "GET",
			"classname" : "Assembla_Model_Ticket"
		},

		"create_ticket" : {
			"uri" : "spaces/${space_id}/tickets",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Ticket"

		},

		"available_custom_fields" : {
			"uri" : "spaces/${space_id}/tickets/custom_fields",
			"type" : "GET",
			"classname" : "Assembla_Model_Ticket_Customfield"
		},

		"update_ticket" : {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}",
			"type" : "PUT",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Ticket"
		},

		"delete_ticket" : {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}",
			"type" : "DELETE"
		},

		"list_of_comments" : {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}/comments",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket_Comment"
		},

		"list_of_components" : {
			"uri" : "spaces/${space_id}/tickets/components",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket_Component"
		},

		"list_of_custom_statuses" : {
			"uri" : "spaces/${space_id}/tickets/custom_statuses",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket_Statuses"
		},

		"create_component" : {
			"uri" : "spaces/${space_id}/tickets/create_component",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Ticket_Component"
		},

		"list_ticket_associations" : {
			"uri" : "spaces/${space_id}/tickets/list_associations",
			"type" : "GET",
			"classname" : "Assembla_Collection_Ticket_Association"
		},

		"add_ticket_association" : {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}/api_add_association",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Ticket_Association"
		},

		"remove_ticket_association" : {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}/api_remove_association",
			"type" : "DELETE",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Ticket_Association"
		},

		"create_ticket_related_time_entry" : {
			"uri" : "spaces/${space_id}/tickets/${ticket_number}/update_time_data_invested",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Ticket_Time_Entry"
		},

		"best_profile" : {
			"uri" : "user/best_profile/${user_id}",
			"type" : "GET",
			"classname" : "Assembla_Model_User"
		},

		"team_members_of_space" : {
			"uri" : "spaces/${space_id}/users",
			"type" : "GET",
			"classname" : "Assembla_Collection_User"
		},

		"promote_user" : {
			"uri" : "spaces/${space_id}/users/${user_id}/promote",
			"type" : "POST",
			"classname" : "Assembla_Model_User"
		},

		"demote_user" : {
			"uri" : "spaces/${space_id}/users/${user_id}/demote",
			"type" : "POST",
			"classname" : "Assembla_Model_User"
		},

		"user_search_by_login" : {
			"uri" : "user/search?field=login&value=${value}",
			"type" : "GET",
			"classname" : "Assembla_Collection_User"
		},

		"user_search_by_email" : {
			"uri" : "user/search?field=email&value=${value}",
			"type" : "GET",
			"classname" : "Assembla_Collection_User"
		},

		"user_search_by_external_id" : {
			"uri" : "user/search?field=external_id&value=${value}",
			"type" : "GET",
			"classname" : "Assembla_Collection_User"
		},

		"list_of_tasks" : {
			"uri" : "user/time_entries",
			"type" : "GET",
			"classname" : "Assembla_Collection_Task"
		},

		"create_task" : {
			"uri" : "user/time_entries",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Task"
		},

		"show_task" : {
			"uri" : "user/time_entires/${task_id}",
			"type" : "GET",
			"classname" : "Assembla_Model_Task"
		},

		"update_task" : {
			"uri" : "user/time_entires/${task_id}",
			"type" : "PUT",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Task"
		},

		"delete_task" : {
			"uri" : "user/time_entires/${task_id}",
			"type" : "DELETE"
		},

		"list_of_time_logs" : {
			"uri" : "user/time_entries/${task_id}/time_logs",
			"type" : "GET",
			"classname" : "Assembla_Collection_Task_Log"
		},

		"create_time_log" : {
			"uri" : "user/time_entries/${task_id}/time_logs",
			"type" : "POST",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Task_Log"
		},

		"show_time_log" : {
			"uri" : "user/time_entires/${task_id}/time_logs/${time_log_id}",
			"type" : "GET",
			"classname" : "Assembla_Model_Task_Log"
		},

		"update_time_log" : {
			"uri" : "user/time_entires/${task_id}/time_logs/${time_log_id}",
			"type" : "PUT",
			"headers" : [ "Content-Type:application/xml" ],
			"classname" : "Assembla_Model_Task_Log"
		},

		"delete_time_log" : {
			"uri" : "user/time_entires/${task_id}/time_logs/${time_log_id}",
			"type" : "DELETE"
		}




	}





}