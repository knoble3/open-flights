module Api
  module V1
    class AirlinesController < ApplicationController
      protect_from_forgery with: :null_session

      before_action :fetch_airline, only: %i[show update destroy]

      def index
        airlines = Airline.all

        render json: AirlineSerializer.new(airlines, options).serialized_json
      end

      def show
        render json: AirlineSerializer.new(airline, options).serialized_json
      end

      def create
        airline = Airline.new(airline_params)

        if airline.save
          render json: AirlineSerializer.new(airline).serialized_json
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      def update
        if airline.update(airline_params)
          render json: AirlineSerializer.new(airline, options).serialized_json
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      def destroy
        if airline.destroy
          head :no_content
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      private

      def fetch_airline
        airline = Airline.find_by(slug: params[:slug])
      end

      def airline_params
        params.require(:airline).permit(:name, :image_url)
      end

      def options
        @options ||= { includes: %i[reviews] }
      end
    end
  end
end
